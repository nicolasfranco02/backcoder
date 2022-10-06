//import firebaseIniciador from "./configFirebase.js"
//import {ContenedorFirebase} from '../ContenedorFirebase.js';

 const config = {
    db: {
        host: 'localhost',
        port: 27017,
        dbName: 'clase19',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "proyecto-backend-8c4de",
        "private_key_id": "aa6a8517446473ee54bdca8b9b39b871d9bcef76",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDiA+zOCSW2x6dk\n/CSfwXVCsZ3QI8MZ/YY5Azl63O9cULR9b+xy8LOJsLMWIoJs5cqXBzOSFXNJ2pR/\n+S632NxxuRHmyCw5Nd8S+TG7PvQRwtkD7rIpd7oJRkMUQ3IkSEaHy0LFmqibgCcD\nDeJU8iwe6y8kbyvrbmN8j1wxks6ldx2MaX4xDmBE1Zp4ohlmxKhqOh9ZbqDCj5+A\nt+JYvDjjBXvooCegvVAfDQJL7kZinbqriTxpCY2a8VLx3T9ChGANKvR/DeznVoa3\n0pcwZ99iEM+R/inp2z10HLvjOgTIpq5lq2WE+6i1xGB9LHJKVbWJeSTR43ltgbAv\nRmddXBb1AgMBAAECggEAEFTHRiX8DyaDDnV3sgF5Fx4dcJ486UJb8f+tJhcTxqBg\nQlYViEKjPnZBon5Q3UyHZH1VOR+KqpH8O/kF6qvlVeRRClN5epLNcSIHeWe1nBjv\ntGyJfByWGTh1/V9YPo3oZsSFqSChQUczynE04v1yubM1v1S3IDZkQupa94wLmYIM\noB4BggstSF3y1TkPwPEAOeNlVEgUlzh87KRYKot7Ee7iM/SD2gY19E6OzDGMabps\nBN9L4mCvdq+6fR9T2zOu0pGoMBn24ScZfg0RfI2NvddWIrnoCm6vNuG+xP5p2JNK\nkKhsqnL87v76EGBEgYbTZMgoIgIElHPOwzGXEc5r2wKBgQD1fpwr0jY3wHrR5qa9\nFQEpeMMvKD1P0e56eHdWIPdHs0MxzhijCWv4ZTI3TV4+nCVTjblHZ2L3X3Ssj2qV\nFEClThR9R8x8ezKrVG0ydG89Lk3v1z6WXTFrN4ZL/84zkuibt6BjIsH1uQdYTppp\nGZs4Hy4jcGyLi6axW/uHgjGk5wKBgQDrr+uPucNM829XqDuxaMeDpwSJOcsD1Z9T\naJJ1aR4wR2mfxSFUEgDEjB6UB2/OFBvrkvFaJJHPN+GtnA76zyvcW6Vb2P6DomPi\nB4uVrcdC2LF+t0JcCe9HtHekUDvLNbwsXGnQCKrFgOtboZCOPhcgKANTpplOdiyr\nCFwvtT5NwwKBgAlHUMXDOzNePgYi7phk69dSbiYhIjgbGiVc2j3SHyaBmv+N55Z5\n66/Gu2Alt3MsWajPyXnuaWoqHHHNNd0Ol+bnjZSymwL1cRPSrBHlHrM0RdPT0dTD\nDvQbdCL5NyTx34LLLO+yR5xu8t0ek213f0teulKylBeuHo3DiT006YVvAoGBAN7J\nloRv9rtAyhk0P+j9wMskD9eft9ZSEp+HlBpEWXMNrjyG3XBY7DzervEC7p8Axzux\n1U9+jg4xJrUzdb2EJFPSlcbyofPQh1ZcB4hfkqIPsAi2NpZGFdfUMdwys7Ltgoj0\nellaOAMmUFR3ruumqbmN2UczjmtqreKmrm2yh8h9AoGAfL6HgX+WlExFu6x/yRQR\nObP+9GVF+iX2FNnl1zuKOgamyM3bu5v6jCC6iJBB1BOzedZ05tm9isWtcEHqDeyl\nsJunYKM8SFOKBPPcXdviriVinKVROrv1i8MovlwJIYbrC+jiEA0Z6J3nJ1RnMVoD\nrjVcrb0ggqwcYy+GEyjsAcE=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-3e2gf@proyecto-backend-8c4de.iam.gserviceaccount.com",
        "client_id": "113266802707571174692",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3e2gf%40proyecto-backend-8c4de.iam.gserviceaccount.com"
      },
      mysql:{
        client:'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'franconicolas',
            password: 'franconicolas',
            database: 'ecommerproyecto'
        }
    },
      
    fileSystem: {
        path: '../../DB'
    },
    MODO_PERSISTENCIA: 'firebase'
}
export default config 