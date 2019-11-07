<template>
    <v-container>
        <v-simple-table fixed-header height="250">
            <table >
                <thead>
                    <th>No</th>
                    <th>Date</th>
                    <th>StartTime</th>
                    <th>EndTime</th>
                    <th>DurationTime</th>
                </thead>
                <tbody>
                    <tr v-for="(record, index) in records" :key="record._id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ record.date }}</td>
                      <td>{{ record.startTime }}</td>
                      <td>{{ record.endTime }}</td>
                      <td>{{ record.duration }}</td>
                    </tr>
                </tbody>
            </table>
        </v-simple-table>
    </v-container>
</template>
<script>
export default {
  name: 'Record',
  data () {
    return {
      records: []
    }
  },
  created () {
    this.recordInit()
    this.$EventBus.$on('insert-record', (newItemId) => {
      this.afterRecordInsert(newItemId)
    })
  },
  methods: {
    recordInit: function () {
      this.$db.find({}).sort({date: 1, startTime: 1, endTime: 1}).exec((err, items) => {
        if (err) console.log(err.stack)
        this.records = items
      })
    },
    afterRecordInsert: function (newItemId) {
      this.$db.findOne({ _id: newItemId }, (err, item) => {
        if (err) console.log(err.stack)
        this.records.push(item)
      })
    }
  }
}
</script>