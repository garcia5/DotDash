<template>
  <div id="app">
    <h1 ref="title">Search for a Book!</h1>

    <!-- Inputs -->
    <div class="flex-container-row justify-center" id="search-group">
      <b-form-select
        id="field-select"
        class="search-form-item"
        title="Field(s) to query against"
        v-model="selectedField"
        :options="fieldOptions"
        v-b-tooltip.hover
      />
      <b-form-input
        class="search-form-item"
        placeholder="Enter search criteria"
        v-model="query"
        :type="'search'"
        @keydown.enter.native="getSearchResults(1)"
      />
      <b-button
        id="search-button"
        class="search-form-item"
        variant="outline-primary"
        @click="getSearchResults(1)"
      >
        Search
      </b-button>
    </div>
    <!-- /Inputs -->

    <!-- Outputs -->
    <div
      id="results-group"
      class="flex-container"
      v-if="!errors && (results !== null || loading)"
    >
      <div class="flex-container-row justify-center" v-if="numResults !== null">
        <b-pagination
          id="nav-button-group"
          v-model="page"
          :totalRows="numResults"
          :perPage="resultsPerPage"
          @change="getSearchResults"
          last-number
        />
      </div>

      <b-table
        class="flex-item-variable"
        sticky-header="100%"
        :items="results"
        :fields="resultTableHeadings"
        :busy="loading"
        :primary-key="'id'"
        striped
        responsive
      >
        <template #table-busy>
          <div id="results-loading">
            <b-spinner></b-spinner>
          </div>
        </template>
        <template #cell(title)="data">
          <span>
            <img :src="data.item.thumbnail" class="grid-thumbnail" />
            {{ data.item.title }}
          </span>
        </template>
        <template #cell(publicationDate)="data">
          <span>
            {{ getPubDate(data.item) }}
          </span>
        </template>
      </b-table>
    </div>
    <!-- /Outputs -->

    <!-- Errors -->
    <div v-if="errors">
      {{ errors }}
    </div>
    <!-- /Errors -->
  </div>
</template>

<script>
import axios from "https://cdn.skypack.dev/axios@0.21.1";
export default {
  data() {
    return {
      // View data
      resultsPerPage: 20,
      errors: null,
      loading: false,
      resultTableHeadings: [
        { key: "title", label: "Title" },
        { key: "authorName", label: "Author" },
        { key: "publicationDate", label: "Publication Date" },
        { key: "averageRating", label: "Average Rating" }
      ],

      // Inputs
      query: "",
      page: 1,
      selectedField: "all",
      fieldOptions: [
        { value: "all", text: "All", disabled: false },
        { value: "title", text: "Title", disabled: false },
        { value: "author", text: "Author", disabled: false }
      ],

      // Outputs
      results: null,
      numResults: null
    };
  },

  methods: {
    getSearchResults(pageNum) {
      this.loading = true;
      // Allow manual page reset from input/button
      this.page = pageNum;

      const url = `https://Dotdash-interview.agarcia02.repl.co/search`;
      const params = {
        query: this.query,
        page: pageNum,
        search: this.selectedField
      };
      const headers = {
        Accept: "application/json"
      };

      axios
        .get(url, { params, headers })
        .then((rsp) => {
          this.results = rsp.data.works;
          this.numResults = rsp.data.totalResults;
        })
        .catch((err) => {
          this.errors = err;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getPubDate(work) {
      // Turn distinct day, month, year values into a single string
      // Omit any value that is not available
      const {
        originalPublicationDay,
        originalPublicationMonth,
        originalPublicationYear
      } = work;
      let formattedPubDate = "";
      if (originalPublicationYear) {
        formattedPubDate += originalPublicationYear;
      }
      if (originalPublicationMonth) {
        formattedPubDate += "-" + originalPublicationMonth.padStart(2, "0");
      }
      if (originalPublicationDay) {
        formattedPubDate += "-" + originalPublicationDay.padStart(2, "0");
      }
      return formattedPubDate;
    }
  }
};
</script>

<style lang="scss">
h1 {
  text-align: center;
}

#app {
  margin-top: 60px;
}

#field-select {
  width: 100px;
}

#results-loading {
  text-align: center;
}

#search-group {
  width: 80%;
  margin: auto;
  max-width: 1000px;
}

.search-form-item {
  margin: 10px;
}

#nav-button-group {
  text-align: center;
  align-content: center;
  padding-top: 10px;
}

#results-group {
  margin: auto;
  width: 80%;
  padding-top: 20px;
  max-height: 100vh;
  flex-grow: 1;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

.flex-container-row {
  display: flex;
  flex-direction: row;
}

.justify-center {
  justify-content: center;
}

.justify-right {
  justify-content: right;
}

.grid-thumbnail {
  padding: 2px;
}
</style>
