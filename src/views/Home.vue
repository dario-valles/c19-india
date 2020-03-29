<template>
  <div class="home">
    <ul class="flex ml-auto mr-auto p-4">
      <li class="mr-6">
        <a class="text-blue-500 hover:text-blue-800" href="#" @click="lang ='eng'">English</a>
      </li>
      <li class="mr-6">
        <a class="text-blue-500 hover:text-blue-800" href="#" @click.prevent="lang ='hin'">हिंदी</a>
      </li>
    </ul>
    <div class="text-center text-xl">
      <p class="text-2xl subpixel-antialiased">
        <b>BREADCRUMB YOUR PATHS NOW</b>
      </p>
      <p
        class="mb-2 text-secondary"
        id="text_enter_mobile"
      >{{ language[lang]['text_enter_mobile'] }}</p>
    </div>
    <SubmitPhone class="align-middle" :lang="lang" />

    <div class>
      <div class="text-center text-lg">
        <p
          style="margin-top: 30px"
          id="text_our_promise"
        >We'll never share your private information with anyone and will text you for free if we find out you've crossed paths with a victim of COVID-19.</p>
        <p class="pt-3" id="text_read_more">
          Read about how c19 protects privacy while preventing the spread of COVID-19
          <a href>here</a>. If you need a list of all locations you've saved over the last 4 weeks click
          <a href>here</a>.
        </p>
        <p id="text_read_more">
          Privacy policy available
          <a href="/privacy_policy">here</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SubmitPhone from "@/components/SubmitPhone.vue";

export default {
  name: "Home",
  components: {
    SubmitPhone
  },
  data: function() {
    return {
      lang: "eng",
      language: {
        eng: {
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
          text_enter_mobile: "अपना मोबाइल नंबर और अपना वर्तमान स्थान दर्ज करें",
          text_mobile_placeholder: "मोबाइल नंबर दर्ज करें",
          text_save_location: "स्थान सहेजें",
          text_our_promise:
            "हम कभी भी आपकी निजी जानकारी किसी के साथ साझा नहीं करेंगे। यदि आप किसी COVID-19 से पीड़ित व्यक्ति के पास से गुजरे हैं, तो हम आपको SMS के द्वारा आपके दिए गए नंबर पर सूचित करेंगे।",
          text_read_more:
            'COVID-19 के प्रसार को रोकने के दौरान हम आपकी निजी जानकारी की गोपनीयता की रक्षा कैसे करते हैं, इसके बारे में <a href="">यहां पढ़ें</a>। यदि आपको पिछले चार हफ्तों में सहेजे गए सभी स्थानों की सूची की आवश्यकता है तो यहां <a href="">क्लिक करें</a>।'
        }
      }
    };
  }
};
</script>
<style lang="css">
a {
  color: #000;
}
</style>
