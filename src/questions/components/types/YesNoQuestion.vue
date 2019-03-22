<template>
  <QuestionRenderless :questionModel="questionModel" @input="(model) => { $emit('input', model)}">
    <template slot-scope="{data: Q}">
    <QuestionTypeSelect
          v-if="mode === 'create'"
          :get-selected="getActiveQuestionTypeSelection"
          :types="questionTypes"
          @load-type="$emit('load-type', $event)"
          class="mb-6"
          >
    </QuestionTypeSelect>
    <form class="w-full max-w-full mx-auto" @submit.prevent="submit">

      <FormInput v-model="Q.question" type="text" label="Question"></FormInput>

      <div v-if="hasOptions">
        <template v-for="option in Q.options">
          <div class="md:flex md:items-start my-6">
            <div class="md:w-1/3">
              <label class="text-sm font-medium text-rn-grey-dark-label">{{ option.name }}</label>
            </div>
            <div class="md:w-2/3">
              <input type="radio" v-model="Q.picked" :value="option" name="yesno">
            </div>
          </div>
        </template>
      </div>
      <div v-else>No options</div>

      <hr class="border">

      <div class="md:flex md:items-start my-6">
        <div class="md:w-1/3">
          <label class="text-sm font-medium text-rn-grey-dark-label">Confidentiality</label>
        </div>
        <div class="md:w-2/3">
          <input type="checkbox" v-model="Q.isConfidential"> <span class="text-xs">Make this question confidential</span>
        </div>
      </div>

      <!-- TODO make separate FormInput for tags autocompletion -->
      <FormInput v-model="Q.tags" label="Category"></FormInput>

      <div class="md:flex md:items-start my-6">
        <div class="md:w-1/3">
          <label class="text-sm font-medium text-rn-grey-dark-label">Answer</label>
        </div>
        <div class="md:w-2/3">
          <input type="checkbox" v-model="Q.addPredefined"> <span class="text-xs">I want to add preferred answer</span>
        </div>
      </div>

      <div v-if="Q.addPredefined" class="md:flex md:items-start mb-6">
        <div class="md:w-1/3">
          <label class="text-sm font-medium text-rn-grey-dark-label">Add predefined answer</label>
        </div>
        <div class="md:w-2/3">
          <textarea class="border rounded rounded-sm" v-model="Q.answer"></textarea>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <pre class="text-xs bg-yellow-lightest">{{ Q.options }}</pre>
        <pre class="text-xs bg-yellow-lightest">{{ Q.picked }}</pre>
      </div>
      <div class="md:w-1/3"></div>
      <div class="md:w-2/3">
        <!-- // todo cancel -->
        <RnButton
           theme="rn-default"
           is-rounded
           @click.prevent="cancel"
           class="mt-2">Cancel</RnButton>
        <RnButton
           theme="rn-default"
           is-rounded
           type="submit"
           class="mt-2">{{ buttonText }}</RnButton>
      </div>
    </form>
    </template>
  </QuestionRenderless>
</template>
<script>
import QuestionTypeSelect from '../QuestionTypeSelect.vue'
import questionMixin from '../mixins/questionMixin.vue'
import QuestionRenderless from '../QuestionRenderless.vue'
import FormInput from '@/questions/components/FormInput.vue'
import RnButton from '@/questions/components/Button.vue'
export default {
  name: 'YesNoQuestion',
  components: { QuestionRenderless, QuestionTypeSelect, FormInput, RnButton },
  mixins: [questionMixin]
}
</script>
