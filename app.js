'use strict';

const PokemonGO = require('pokemon-go-node-api');

// using var so you can login with multiple users
let a = new PokemonGO.Pokeio();

//Set environment variables or replace placeholder text
let location = {
    type: 'name',
    name: 'Tokyo/Taito-ku' //東京都台東区
};

let username = '登録したGoogleアカウントのメールアドレス';
let password = '登録したGoogleアカウントのパスワード';
let provider = 'google';

a.init(username, password, location, provider, (err) => {
    if (err) throw err;

    console.log('1[i] Current location: ' + a.playerInfo.locationName);
    console.log('1[i] lat/long/alt: : ' + a.playerInfo.latitude + ' ' + a.playerInfo.longitude + ' ' + a.playerInfo.altitude);

    a.GetProfile((err, profile) => {
        if (err) throw err;

        console.log('1[i] Username: ' + profile.username);
        console.log('1[i] Poke Storage: ' + profile.poke_storage);
        console.log('1[i] Item Storage: ' + profile.item_storage);

        let poke = 0;
        if (profile.currency[0].amount) {
            poke = profile.currency[0].amount;
        }

        console.log('1[i] Pokecoin: ' + poke);
        console.log('1[i] Stardust: ' + profile.currency[1].amount);

        setInterval(() => {
            a.Heartbeat((err,hb)=>{
                if(err) {
                    console.log(err);
                }

                let texts = '';
                for (var i = hb.cells.length - 1; i >= 0; i--) {
                    if(hb.cells[i].NearbyPokemon[0]) {
                        //console.log(a.pokemonlist[0])
                        let pokemon = a.pokemonlist[parseInt(hb.cells[i].NearbyPokemon[0].PokedexNumber)-1];
                        console.log('1[+] There is a ' + pokemon.name + ' near.');
                        //この辺にWebhookとか噛ませればSlack通知とかも余裕ですね。
                    }
                }
            });
        }, 5000);

    });
});