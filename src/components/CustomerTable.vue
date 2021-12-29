<style scoped>
 .table-responsive {
		overflow-y: auto;
		height: calc(100vh - 260px);
	}
  th {
    background-color: rgb(211, 231, 25);
    color: rgb(18, 18, 19);
} 
	tr[tag="1"] input,
	tr[tag="1"] select,
	tr[tag="1"] td
	{
		background-color: lightsteelblue;
	}
</style>
<template>
 <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    > -->
       <v-navigation-drawer
       color="primary"
       dark
     permanent
     app>
  <template>
    <v-col
      cols="10"
      sm="6"
      md="11"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="fromDate"
            label="From Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
     <v-col
      cols="12"
      sm="6"
      md="11"
    >
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="date2"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="toDate"
            label="To Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date2"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="$refs.menu2.save(date2)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="11"
    >
      <v-menu
        ref="menu3"
        v-model="menu3"
      >
        <template v-slot:activator="{ attrs }">
          <v-text-field
            label="Search Bill No. Then Enter"
            v-bind="attrs"
            v-model="billno"
            v-on:keyup.enter="filter"
          ></v-text-field>
        </template>
        </v-menu>
        </v-col>
    <v-spacer></v-spacer>
    </template>
  </v-navigation-drawer>
    <!-- </v-app-bar> -->
    <v-main>
      <table class="table table-responsive">
  <thead class="thead-dark">
    <tr> 
      <th class="d-none" scope="col">No.</th>
      
      <th></th>
      <th class="text-center">Transaction Date</th>
      <th class="text-center">Department</th>  
      <th class="text-center">Waiter Name</th>
      <th class="text-center">Table Number</th>
      <th class="text-center">Bill Number</th>  
      <th class="text-center col-md-4" >Guest Name</th>
      <th class="text-center">Pax</th>
      <th class="text-center col-md-2">Total Amount</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(isi, idx) in mainlist" :key="idx"> 
       <td class="tdfit d-none">{{idx + 1}}</td>
       <td></td>
      <td>{{isi['trans-date']}}</td>
      <td class="tdfit text-center">{{isi.department}}</td> 
      <td>{{isi['waiter-name']}}</td>
      <td>{{isi['table-no']}}</td>
      <td>{{isi['bill-no']}}</td> 
      <td>{{isi['guest-name']}}</td>
      <td>{{isi.pax}}</td>
      <td class="tdfit text-right">{{getMoney(isi['total-amount'])}}</td>  
      <td></td>
    </tr> 
  </tbody>
</table>
    </v-main>
  </v-app>
  
</template>

<script>
  import axios from "axios"
  export default {
    name: 'customer-table',
     data() {
        return {
          mainlist: [],
          date: '',
          date2: '',
          menu: '',
          menu2: '',
          billno: '',
          menu3:'',
          fromDate : '11/15/21',
          toDate   : '11/15/21'
        }
     },
     mounted() {
       this.getData()
     },
     
     methods: {

       getData() {
         axios.post('http://ws1.e1-vhp.com:8080/VHPWebBased1/rest/Common/testWebdev', {
          request: { 
            fromDate: this.fromDate,
            toDate: this.toDate
            }
      })
         .then(ooj => {
           this.mainlist = ooj.data.response.outletTransaction['outlet-transaction']
         })
       },

       getMoney(value) {
				let sil = Number(value).toLocaleString('en', {})
				if (sil !== 'NaN') return sil
				return '0'.toLocaleString('en', {})
			},

       filter() {
        axios.post('http://ws1.e1-vhp.com:8080/VHPWebBased1/rest/Common/testWebdev', {
          request: { 
            fromDate: this.fromDate,
            toDate: this.toDate
            }
      })
         .then(oob => {
           this.mainlist = oob.data.response.outletTransaction['outlet-transaction']
           .filter(b => b['bill-no'] == this.billno)
         })
       }
     },
     watch: {
       handler(oldVal, newVal) {
         this.filter()
		},
    immediate: true
    }
  }
</script>

