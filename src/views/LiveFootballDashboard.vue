<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Live Football Scores</h1>
      <div class="flex space-x-4 mb-6 overflow-x-auto">
        <TabButton v-for="tab in tabs" :key="tab.value" :class="activeTab === tab.value ? 'bg-blue-200' : ''" :label="tab.label" :value="tab.value" :icon="tab.icon" @click="setActiveTab(tab.value)" />
        <InputSearch v-if="!isMobile" @search="handleSearch" style="margin-left: auto !important" />
      </div>
      <InputSearch v-if="isMobile" @search="handleSearch" style="margin-left: auto !important" class="mb-2" />

      <div v-if="isMobile">
        <!-- <div v-for="match in filteredMatches" :key="match.id"> -->
        <div v-for="(match, index) in filteredMatches" :key="'league-' + index">
          <h5 class="text-2xl font-medium text-gray-600 mb-2">{{ match.league }}</h5>
          <template v-for="(game, gameIndex) in match.games" :key="'game-' + gameIndex">
            <MobileMatchCard :match="game" />
          </template>
        </div>
      </div>

      <div v-else>
        <MatchTable :matches="filteredMatches" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import TabButton from "@/components/TabButton.vue";
import MobileMatchCard from "@/components/MobileMatchCard.vue";
import MatchTable from "@/components/MatchTable.vue";
import InputSearch from "@/components/InputSearch.vue";

export default {
  name: "LiveFootballDashboard",
  components: {
    TabButton,
    MobileMatchCard,
    MatchTable,
    InputSearch,
  },
  setup() {
    const activeTab = ref("all");
    const matches = ref([]);
    const isMobile = ref(window.innerWidth <= 768);
    const searchQuery = ref("");
    const intervalId = ref(null);
    const tabs = [
      { label: "Tất cả", value: "all", icon: "⚽" },
      { label: "Trực tiếp", value: "live", icon: "⏱" },
      { label: "Đã kết thúc", value: "finished", icon: "✔" },
    ];

    const mockMatches = {
      matches: [
        {
          league: "Giải bóng đá nữ Algeria",
          games: [
            {
              time: "56'",
              home_team: "Algeria Women's National Team",
              away_team: "Morocco Women's National Team",
              score: "1 - 0",
              status: "Đang diễn ra",
            },
            {
              time: "HT",
              home_team: "Cameroon Women's National Team",
              away_team: "Nigeria Women's National Team",
              score: "2 - 0",
              status: "Nghỉ giữa hiệp",
            },
            {
              time: "90'",
              home_team: "South Africa Women's National Team",
              away_team: "Zambia Women's National Team",
              score: "3 - 1",
              status: "Kết thúc",
            },
          ],
        },
        {
          league: "Siêu cúp Ấn Độ - Bảng đấu A",
          games: [
            {
              time: "73'",
              home_team: "FC Goa",
              away_team: "Bengaluru FC",
              score: "0 - 0",
              status: "Đang diễn ra",
            },
            {
              time: "45'",
              home_team: "Mumbai City FC",
              away_team: "Hyderabad FC",
              score: "1 - 1",
              status: "Nghỉ giữa hiệp",
            },
            {
              time: "90'",
              home_team: "Kerala Blasters FC",
              away_team: "Odisha FC",
              score: "4 - 2",
              status: "Kết thúc",
            },
            {
              time: "15'",
              home_team: "Chennaiyin FC",
              away_team: "ATK Mohun Bagan",
              score: "0 - 1",
              status: "Đang diễn ra",
            },
          ],
        },
        {
          league: "Liga U21 Algeria",
          games: [
            {
              time: "30'",
              home_team: "USM Alger",
              away_team: "CR Belouizdad",
              score: "2 - 0",
              status: "Đang diễn ra",
            },
            {
              time: "HT",
              home_team: "MC Alger",
              away_team: "ES Setif",
              score: "0 - 0",
              status: "Nghỉ giữa hiệp",
            },
            {
              time: "85'",
              home_team: "JS Kabylie",
              away_team: "NA Hussein Dey",
              score: "3 - 2",
              status: "Đang diễn ra",
            },
            {
              time: "FT",
              home_team: "CS Constantine",
              away_team: "US Biskra",
              score: "1 - 1",
              status: "Kết thúc",
            },
            {
              time: "60'",
              home_team: "MC Oran",
              away_team: "ASO Chlef",
              score: "0 - 0",
              status: "Đang diễn ra",
            },
          ],
        },
        {
          league: "Giải ngoại hạng Bangladesh",
          games: [
            {
              time: "20'",
              home_team: "Abahani Limited Dhaka",
              away_team: "Sheikh Jamal DC",
              score: "1 - 0",
              status: "Đang diễn ra",
            },
            {
              time: "HT",
              home_team: "Mohammedan SC",
              away_team: "Chittagong Abahani",
              score: "0 - 2",
              status: "Nghỉ giữa hiệp",
            },
            {
              time: "FT",
              home_team: "Saif SC",
              away_team: "Rahmatganj MFS",
              score: "3 - 3",
              status: "Kết thúc",
            },
          ],
        },
        {
          league: "Cúp quốc gia Việt Nam",
          games: [
            {
              time: "60'",
              home_team: "Hà Nội FC",
              away_team: "Hoàng Anh Gia Lai",
              score: "2 - 1",
              status: "Đang diễn ra",
            },
            {
              time: "HT",
              home_team: "Bình Dương FC",
              away_team: "Sài Gòn FC",
              score: "1 - 0",
              status: "Nghỉ giữa hiệp",
            },
            {
              time: "FT",
              home_team: "Câu lạc bộ TP.HCM",
              away_team: "Quảng Nam FC",
              score: "4 - 0",
              status: "Kết thúc",
            },
            {
              time: "75'",
              home_team: "Thanh Hóa FC",
              away_team: "Đà Nẵng FC",
              score: "1 - 1",
              status: "Đang diễn ra",
            },
          ],
        },
      ],
    };

    const handleSearch = (query) => {
      searchQuery.value = query;
    };

    const filteredMatches = computed(() => {
      const filterStatus = (status) =>
        matches.value
          .map((match) => ({
            ...match,
            games: match.games.filter((game) => game.status === status),
          }))
          .filter((match) => match.games.length > 0);
      let filtered = matches.value;
      if (activeTab.value === "live") {
        filtered = filterStatus("Đang diễn ra");
      } else if (activeTab.value === "finished") {
        filtered = filterStatus("Kết thúc");
      }
      if (searchQuery.value) {
        filtered = filtered.map((match) => ({
          ...match,
          games: match.games.filter((game) => game.home_team.toLowerCase().includes(searchQuery.value.toLowerCase()) || game.away_team.toLowerCase().includes(searchQuery.value.toLowerCase())),
        }));
      }
      return filtered;
    });
    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    const generateScore = () => {
      const homeGoals = Math.floor(Math.random() * 5);
      let awayGoals = Math.floor(Math.random() * 5);

      if (Math.abs(homeGoals - awayGoals) > 3) {
        awayGoals = homeGoals + Math.floor(Math.random() * 3);
      }
      return `${homeGoals} - ${awayGoals}`;
    };

    const updateMatchTimeAndScore = () => {
      matches.value.forEach((match) => {
        match.games.forEach((game) => {
          if (game.status === "Đang diễn ra") {
            const currentTime = parseInt(game.time.split("'")[0]);
            if (game.time === "HT" || game.time === "FT") return;
            game.time = currentTime + 1 + "'";
            game.score = generateScore();
          }
        });
      });
    };

    onMounted(() => {
      matches.value = mockMatches.matches;
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth <= 768;
      });
      intervalId.value = setInterval(() => {
        updateMatchTimeAndScore();
      }, 10000);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", () => {
        isMobile.value = window.innerWidth <= 768;
      });
      clearInterval(intervalId.value);
    });

    return {
      tabs,
      activeTab,
      matches,
      isMobile,
      filteredMatches,
      setActiveTab,
      handleSearch,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles for the LiveFootballDashboard component here */
</style>
