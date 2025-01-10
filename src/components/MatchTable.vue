<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Home Team</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Away Team</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-if="matches.length === 0">
          <td colspan="5" class="px-6 py-4 text-center text-gray-500">No matches available</td>
        </tr>
        <template v-for="(match, index) in matches" :key="'league-' + index">
          <!-- League Header -->
          <tr class="bg-gray-200">
            <td colspan="5" class="border border-gray-300 px-4 py-2 font-bold">{{ match.league }}</td>
          </tr>
          <!-- Games -->
          <tr v-for="(game, gameIndex) in match.games" :key="'game-' + gameIndex" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center justify-between">
                <span class="ml-4 text-sm font-medium text-gray-900">{{ game.home_team }}</span>
                <span class="w-8 h-8 rounded-full object-cover bg-sky-600" />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex items-center justify-center space-x-4">
                <span :class="getScoreClass(getScoreHomeTeam(game.score), getScoreAwayTeam(game.score))">
                  {{ getScoreHomeTeam(game.score) }}
                </span>
                <span class="text-sm text-gray-500">{{ game.time }}</span>
                <span :class="getScoreClass(getScoreAwayTeam(game.score), getScoreHomeTeam(game.score))">
                  {{ getScoreAwayTeam(game.score) }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center justify-between">
                <span class="w-8 h-8 rounded-full object-cover bg-green-300" />
                <span class="mr-4 text-sm font-medium text-gray-900">{{ game.away_team }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500" :class="getStatusClass(game.status)">{{ game.status }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MatchTable",
  props: {
    matches: {
      type: Array,
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
  },
};
</script>

<style scoped>
/* Add any specific styles for MatchTable here */
</style>
