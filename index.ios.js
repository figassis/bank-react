'use strict';

import React, { Component } from 'react';
import { 
  AppRegistry,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Navigator,
  Alert
} from 'react-native';

import {Actions, Scene, Router, TabBar} from 'react-native-router-flux';
let PushNotification = require('react-native-push-notification');

StatusBar.setBarStyle('light-content');

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
		let tokenString = token.token;
		//let tokenString = "test-token-string-ios";
        console.log( 'TOKEN:', tokenString );

        if (typeof tokenString != undefined) {
            // Save in database
            db.write(() => {
                // Delete tokens
                let allTokens = db.objects('DeviceToken');
                db.delete(allTokens); 

                db.create('DeviceToken', { 
                   Token: tokenString,
                   Platform: "ios"
                });
            });
        }
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: (optional) GCM Sender ID.
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * IOS ONLY: (optional) default: true
      * - Specified if permissions will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

class BVNK extends Component {

	render() {
        return <Router navigationBarStyle={styles.navbar.base} titleStyle={styles.navbar.title} barButtonTextStyle={styles.navbar.buttonText} barButtonIconStyle={styles.navbar.buttonIcon}>
                <Scene key="drawer" component={DrawerView} open={false} type='replace' >
                    <Scene key="root" drawerImage={require('./assets/hamburger-sm.png')}>
                        <Scene key="loginRegister" component={LoginRegisterView} hideNavBar={true} />
                        <Scene key="login" component={LoginView} hideNavBar={false}/>
                        <Scene key="register" component={RegisterView} hideNavBar={false}/>
                        <Scene key="createAuth" component={CreateAuthView} hideNavBar={false}/>
                        <Scene key="main" component={MainAccountView} hideNavBar={false}/>
                        <Scene key="contact" component={ContactView} hideNavBar={false}/>
                        <Scene key="paymentContactsList" component={MainContactsView} hideNavBar={false}/>
                        <Scene key="paymentCredit" component={MainPaymentCreditView} hideNavBar={false}/>
                        <Scene key="paymentDeposit" component={MainPaymentDepositView} hideNavBar={false}/>
                        <Scene key="settings" component={MainSettingsView} hideNavBar={false}/>
                        <Scene key="transaction" component={TransactionView} hideNavBar={false}/>
                        <Scene key="transactionList" component={MainTransactionView} hideNavBar={false}/>
                        <Scene key="accountSearch" component={AddContactView} hideNavBar={false}/>
                        <Scene key="accountFetch" component={FetchAccountView} hideNavBar={false}/>
                        <Scene key="about" component={MainAboutView} hideNavBar={false}/>
                    </Scene>
                </Scene>
        </Router>
    }
}

var styles = require('./styles');
// Views
var DrawerView = require('./DrawerView');
var LoginRegisterView = require('./LoginRegisterView');
var LoginView = require('./LoginView');
var RegisterView = require('./RegisterView');
var CreateAuthView = require('./CreateAuthView');
var MainAccountView = require('./MainAccountView');
var ContactView = require('./ContactView');
var MainPaymentCreditView = require('./MainPaymentCreditView');
var MainPaymentDepositView = require('./MainPaymentDepositView');
var MainSettingsView = require('./MainSettingsView');
var MainContactsView = require('./MainContactsView');
var TransactionView = require('./TransactionView');
var MainTransactionView = require('./MainTransactionsView');
var AddContactView = require('./AddContactView');
var FetchAccountView = require('./FetchAccountView');
var MainAboutView = require('./MainAboutView');

// DB
var db = require('./libs/RealmDB');
//console.log(db.path);

AppRegistry.registerComponent('BVNK', () => BVNK);
