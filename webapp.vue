<template>
  <div id="app">
    <h1 ref="title">Search for a Book!</h1>

    <div class="flex-container-row justify-center" id="search-group">
      <b-form-select
        v-model="selectedField"
        :options="fieldOptions"
        class="search-form-item"
        id="field-select"
        title="Field(s) to query against"
        v-b-tooltip.hover
      />
      <b-form-input
        v-model="query"
        :type="'search'"
        class="search-form-item"
        placeholder="Enter search criteria"
        @keydown.enter.native="getSearchResults()"
      />
      <b-button
        variant="outline-primary"
        id="search-button"
        @click="getSearchResults"
        class="search-form-item"
      >
        Search
      </b-button>
    </div>

    <div
      id="results-group"
      class="flex-container"
      v-if="!errors && results !== null"
    >
      <div
        class="flex-container-row justify-center"
        v-if="results && numResults > 0"
      >
        <b-pagination
          id="nav-button-group"
          v-model="page"
          @input="getSearchResults()"
          :totalRows="numResults"
          :perPage="resultsPerPage"
          last-number
        />
      </div>
      <b-table
        striped
        responsive
        sticky-header="100%"
        :items="results"
        :fields="resultTableHeadings"
        :busy="loading"
        :primary-key="'id'"
        class="flex-item-variable"
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
      </b-table>
    </div>
    <div v-if="errors">
      {{ errors }}
    </div>
  </div>
</template>

<script>
import axios from "https://cdn.skypack.dev/axios@0.21.1";
export default {
  data() {
    return {
      query: "",
      page: 1,
      selectedField: "all",
      fieldOptions: [
        { value: "all", text: "All", disabled: false },
        { value: "title", text: "Title", disabled: false },
        { value: "author", text: "Author", disabled: false }
      ],
      resultTableHeadings: [
        { key: "title", label: "Title" },
        { key: "authorName", label: "Author" },
        { key: "publicationDate", label: "Publication Date" },
        { key: "averageRating", label: "Average Rating" }
      ],
      results: null,
      resultsPerPage: 20,
      numResults: 0,
      errors: null,
      loading: false
    };
  },
  methods: {
    getSearchResults() {
      const url = `https://Dotdash-interview.agarcia02.repl.co/search`;
      const params = {
        query: this.query,
        page: this.page,
        search: this.selectedField
      };
      const headers = {
        Accept: "application/json"
      };
      this.results = [];
      this.loading = true;
      axios
        .get(url, { params, headers })
        .then((rsp) => {
          this.results = this.formatWorks(rsp.data.works);
          this.numResults = rsp.data.totalResults;
        })
        .catch((err) => {
          this.errors = err;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatWorks(works) {
      return works.map((work) => {
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
        return {
          publicationDate: formattedPubDate,
          ...work
        };
      });
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

