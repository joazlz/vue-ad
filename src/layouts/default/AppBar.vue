<template>
  <!-- <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />

      Base Preset
    </v-app-bar-title>
  </v-app-bar> -->
  
  <v-navigation-drawer v-model="drawerVisible">
    <v-list>
      <v-list-item>
        <v-btn to="/" text="Home"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn to="/area" text="Area"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Desperfecto"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Equipo"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Material"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Revisado"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Tipos de Equipo"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Tipos de Mantenimiento"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Tipos de Motor"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Tipos de Notificacion"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Tipos de Refrigerante"></v-btn>
      </v-list-item>
      <v-list-item>
          <v-btn text="Tipos de Usuario"></v-btn>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
  <v-app-bar>
    <!-- #COLOR FONDO -->
    <!-- <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template> -->

    <template v-slot:prepend>
      <v-app-bar-nav-icon  @click="drawerVisible = !drawerVisible"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Control Mantenimiento</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-expand-x-transition>
      <v-card
        v-show="expand2"
        height="50"
        width="300"
        class="mx-auto bg-secondary"
      ><v-text-field
      ></v-text-field></v-card>
    </v-expand-x-transition>
    <v-btn
        class="ma-2"
        color="secondary"
        @click="expand2 = !expand2"
        icon
      >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <div v-if="Object.keys(account).length !== 0">{{ account.name }}</div>
    <v-btn v-if="Object.keys(account).length === 0" @click="SignIn" icon>
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-btn v-if="Object.keys(account).length !== 0" @click="SignOut" icon>
      <v-icon>mdi-location-exit</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script setup>
</script>


<script>
import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: '4ecb0b45-ac11-40db-aecb-bac2c8eb5487',
    authority: 'https://login.microsoftonline.com/bd6d9af2-8e0a-4d84-aa55-35de9c9efc5d'
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  // system: {
  //   loggerOptions: {
  //     logLevel: LogLevel.Trace,
  //     loggerCallback: (level, message, containsPii) => {
  //       if (containsPii) {
  //         return;
  //       }
  //       switch (level) {
  //         case LogLevel.Error:
  //           console.error(message);
  //           return;
  //         case LogLevel.Info:
  //           console.info(message);
  //           return;
  //         case LogLevel.Verbose:
  //           console.debug(message);
  //           return;
  //         case LogLevel.Warning:
  //           console.warn(message);
  //           return;
  //         default:
  //           console.log(message);
  //           return;
  //       }
  //     }
  //   }
  // }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export default {
  data() {
    return {
      account: {},
      expand2: false,
      drawerVisible: false,
    };
  },
  async created() {
    await msalInstance.initialize();
  },
  methods: {
    async SignIn() {
      try {
        const loginResponse = await msalInstance.loginPopup({});
        this.account = loginResponse.account
        console.log(this.account)
      } catch (err) {
        console.log(err)
      }
    },
    async SignOut() {
      const currentAccount = msalInstance.getAccountByHomeId(this.account.homeAccountId);
      await msalInstance.logoutPopup({
        account: currentAccount,
        postLogoutRedirectUri: "https://localhost:3000/logout",
        mainWindowRedirectUri: "http://localhost:3000",
      });
    },
  },
};
</script>