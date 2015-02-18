TRANSLATION = {
    en : {
        of: function(name, gender, what) {
            return name + "'s " + what;
        },
        friendsOf: function(name) {
            return name + "'s Friends";
        },
        photosOf: function(name) {
            return name + "'s Photos";
        },
        photoquestsOf: function(name) {
            return name + "'s Photoquests";
        },
        people: "People",
        photoquests: "Photoquests"
    },
    ru: {
        of: function(name, gender, what, whatEn) {
            var person = {
                gender: gender ? 'male' : 'female',
                first: name
            };
            var result = petrovich(person, 'genitive').first.split("-")[0];
            if(result ===  name){
                return TRANSLATION.en.of(name, gender, whatEn);
            }

            return what + " " + result;
        },
        friendsOf: function(name, gender) {
            return this.of(name, gender, "Друзья", "Friends");
        },
        photosOf: function(name, gender) {
            return this.of(name, gender, "Фотографии", "Photos");
        },
        photoquestsOf: function(name, gender) {
            return this.of(name, gender, "Фотоквесты", "Photoquests");
        },
        people: "Люди",
        photoquests: "Фотоквесты"
    }
};
