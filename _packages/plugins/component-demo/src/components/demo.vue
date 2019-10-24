<template>
  <div class="stories-demo">
    <div>
      <Story :name="name" />
    </div>
    <div class="stories-demo__toolbar">
      <button class="stories-demo__button" @click="srcVisible = !srcVisible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
          />
        </svg>
      </button>
    </div>
    <ExpandTransition>
      <div v-show="srcVisible">
        <StorySrc :name="name" />
      </div>
    </ExpandTransition>
  </div>
</template>

<script>
import Story from "./story.vue";
import StorySrc from "./story-src.vue";
import ExpandTransition from "./expand-transition.vue";
export default {
  data() {
    return {
      srcVisible: false
    };
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: {
    Story,
    StorySrc,
    ExpandTransition
  }
};
</script>

<style>
.stories-demo {
  border: 0;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.stories-demo__toolbar {
  border: 1px solid #f3f3f3;
  padding: 0.25rem;
  border-radius: 7px 7px;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  margin-bottom: -1rem;
}

.stories-demo__button {
  border: 0;
  padding: 0.2rem;
  background-color: white;
  outline: none;
  cursor: pointer;
}

.stories-demo__button:hover {
  background-color: #efefef;
  border-radius: 7px 7px;
}
</style>