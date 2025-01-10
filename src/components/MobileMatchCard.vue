<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4">
    <div class="flex items-center justify-between">
      <span class="min-w-10 h-10 rounded-full object-cover bg-sky-600" />
      <span class="ml-2 font-semibold">{{ match.home_team }}</span>
      <span class="mx-2 text-lg font-bold" :class="getScoreClass(getScoreHomeTeam(match.score), getScoreAwayTeam(match.score))">{{ getScoreHomeTeam(match.score) }}</span>
      <span class="mx-2 text-lg font-bold">:</span>
      <span class="mx-2 text-lg font-bold" :class="getScoreClass(getScoreAwayTeam(match.score), getScoreHomeTeam(match.score))">{{ getScoreAwayTeam(match.score) }}</span>
      <span class="ml-2 font-semibold">{{ match.away_team }}</span>
      <span class="min-w-10 h-10 rounded-full object-cover bg-green-300" />
    </div>
    <div class="mt-2 text-sm text-gray-600" :class="getDivStatusPos(match.status)">
      <span :class="getStatusClass(match.status)">{{ match.status }}</span> - <span>{{ match.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMatchCard",
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getScoreHomeTeam(score) {
      return score.split(" - ")[0];
    },
    getScoreAwayTeam(score) {
      return score.split(" - ")[1];
    },
    getScoreClass(homeScore, awayScore) {
      if (homeScore > awayScore) return "text-green-500";
      if (homeScore < awayScore) return "text-red-500";
      return "text-gray-500";
    },
    getStatusClass(status) {
      if (status === "Đang diễn ra") return "text-green-500";
      if (status === "Nghỉ giữa hiệp") return "text-yellow-500";
      return "text-gray-500";
    },
    getDivStatusPos(status) {
      if (status === "Đang diễn ra") return "text-left";
      if (status === "Nghỉ giữa hiệp") return "text-center";
      return "text-right";
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for MobileMatchCard here */
</style>
