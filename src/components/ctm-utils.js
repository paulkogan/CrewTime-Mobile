import React, {Component} from 'react';


export function getVersion() {

          return "5.6"

}

export function getAPI_endpoint() {
          //let current_ENV = process.env.NODE_ENV;

        let current_ENV = 'production';
      //let current_ENV = 'development';

        if (current_ENV  === 'production')  {
                 return "http://crew-time.us-east-2.elasticbeanstalk.com"
        } else {
                 return "http://localhost:8081"
        }

} //function



export function convertSimpleDate(rawDate) {
          var today = rawDate
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();
          if (dd<10){  dd='0'+dd }
          if(mm<10){   mm='0'+mm }
          let simpleDate = yyyy+'-'+mm+'-'+dd;
          return simpleDate
}

export function getTodaysDate() {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();
          if (dd<10){  dd='0'+dd }
          if(mm<10){   mm='0'+mm }
          let todaysDate = yyyy+'-'+mm+'-'+dd;
          return todaysDate
}

export function getCurrentTime() {
          var today = new Date();
          var hour = today.getHours();
          var mins = today.getMinutes();
          if(hour<10){   hour ='0'+hour}
          if(mins<10){   mins ='0'+mins}
          let currentTime =  hour+':'+mins
          return currentTime
}


export function getTimeZoneOffset() {
          let today = new Date();
          let timeZoneOffset = today.getTimezoneOffset()
          //console.log("Raw Offset is " + timeZoneOffset)
          let hoursOffset = parseInt(timeZoneOffset/60)
          return hoursOffset
}





export function formatCurrency (amount) {
            if (!amount) return "$0.00"

            if (amount >= 0) {
               return "$"+amount.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            } else {
               return "($"+(-1*amount).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+")";
            }
} //function
