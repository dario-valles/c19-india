<template>
  <div
    :class="hideControls ? 'ml-auto mr-auto flex flex-col rounded-lg shadow-lg max-w-4xl md:h-56 ' : 'ml-auto mr-auto flex flex-col max-w-4xl md:h-56 bg-white rounded-lg shadow-lg overflow-hidden md:flex-row my-10'"
  >
    <div
      :class="hideControls ? 'md:flex h-full items-center justify-center md:bg-gray-700' : 'md:flex items-center justify-center md:w-1/2 md:bg-gray-700'"
    >
      <div class="py-6 px-8 md:py-0">
        <h2 class="text-gray-700 text-2xl font-bold md:text-gray-100">{{ locationOrPhone }}</h2>
        <p
          v-if="!gettingLocation"
          class="mt-2 text-gray-600 md:text-gray-400"
        >Once save location you'll see your location</p>
        <p class="mt-2 text-red-600 md:text-gray-400">{{errorStr}}</p>
      </div>
    </div>
    <div
      class="flex items-center justify-center pt-1 pb-6 md:py-0 md:w-1/2 md:border-b-6 border-gray-700"
      v-show="!hideControls"
    >
      <form v-if="!gettingLocation && !showAllow">
        <div class="flex flex-col rounded-lg overflow-hidden sm:flex-row">
          <input
            class="py-3 px-4 bg-gray-200 text-gray-800 border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100"
            type="number"
            maxlength="10"
            v-model.number="phone"
            :placeholder="language[lang]['text_mobile_placeholder']"
          />
          <button
            @click.prevent="handelPermission"
            :disabled="!isPhoneValid"
            :class="(!isPhoneValid ? 'cursor-not-allowed opacity-50 ': '' )+'py-3 px-4 bg-gray-700 text-gray-100 font-semibold uppercase hover:bg-gray-600'"
          >{{language[lang]['text_save_location']}}</button>
        </div>
      </form>
      <div v-show="showAllow">
        <h2 class="text-xl bold">
          <b>Please allow location and notifications</b>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmitData",
  props: {
    lang: String
  },
  data: function() {
    return {
      errorStr: "",
      showAllow: false,
      language: {
        eng: {
          text_your_phone: "Add your phone number",
          text_enter_mobile:
            "Enter your mobile number and save your current location:",
          text_mobile_placeholder: "Enter Mobile Number",
          text_save_location: "Save Location",
          text_our_promise:
            "We'll never share your private information with anyone and will text you for free if we find out you've crossed paths with a victim of COVID-19.",
          text_read_more:
            "Read about how c19 protects privacy while preventing the spread of COVID-19 <a href=''>here</a>. If you need a list of all locations you've saved over the last 4 weeks click <a href=''>here</a>."
        },
        hin: {
          text_your_phone: "अपना मोबाइल नंबर",
          text_enter_mobile: "अपना मोबाइल नंबर और अपना वर्तमान स्थान दर्ज करें",
          text_mobile_placeholder: "मोबाइल नंबर दर्ज करें",
          text_save_location: "स्थान सहेजें",
          text_our_promise:
            "हम कभी भी आपकी निजी जानकारी किसी के साथ साझा नहीं करेंगे। यदि आप किसी COVID-19 से पीड़ित व्यक्ति के पास से गुजरे हैं, तो हम आपको SMS के द्वारा आपके दिए गए नंबर पर सूचित करेंगे।",
          text_read_more:
            'COVID-19 के प्रसार को रोकने के दौरान हम आपकी निजी जानकारी की गोपनीयता की रक्षा कैसे करते हैं, इसके बारे में <a href="">यहां पढ़ें</a>। यदि आपको पिछले चार हफ्तों में सहेजे गए सभी स्थानों की सूची की आवश्यकता है तो यहां <a href="">क्लिक करें</a>।'
        }
      },
      initialPosition: {
        lat: 0,
        lng: 0
      },
      phone: "",
      isPhoneValid: false,
      gettingLocation: false,
      hideControls: false
    };
  },

  watch: {
    phone: function(val) {
      if (val) this.isPhoneValid = /^[6-9]\d{9}$/.test(val);
    }
  },

  mounted: function() {
    const cookie = this.getCookie("phone");
    if (cookie) {
      this.phone = cookie;
      this.gettingLocation = true;
      this.handelPermission(false);
    }
  },

  computed: {
    locationOrPhone: function() {
      if (this.gettingLocation) {
        return (
          "Your location " +
          this.initialPosition.lat +
          " " +
          this.initialPosition.lng
        );
      } else {
        return this.language[this.lang]["text_your_phone"];
      }
    }
  },

  methods: {
    updateData: function(data) {
      // push data to server
      this.hideControls = true;
      console.log(data);
    },
    handelPermission: function(setCookie = true) {
      const OneSignal = window.OneSignal || [];
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }
      if (OneSignal) {
        OneSignal.push(function() {
          OneSignal.init({
            appId: "21652631-f5d9-4c8c-b631-01ecfbad3dca"
          });
        });
      }
      // set cookie:
      if (setCookie) {
        document.cookie =
          "phone=" +
          this.phone +
          ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
      }
      setCookie ? (this.showAllow = true) : (this.hideControls = true);
      navigator.geolocation.watchPosition(
        pos => {
          this.gettingLocation = true;
          this.initialPosition.lat = pos.coords.latitude;
          this.initialPosition.lng = pos.coords.longitude;
          const userData = {
            position: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
          };
          this.updateData(userData);
        },
        err => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    },
    getCookie: function(cname) {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
