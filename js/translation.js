TRANSLATION = {
    en : {
        friendsOf: function(name) {
            return name + "'s Friends";
        },
        people: "People",
        photoquests: "Photoquests"
    },
    ru: {
        friendsOf: function(name, gender) {
            var person = {
                gender: gender ? 'male' : 'female',
                first: name
            };
            var result = petrovich(person, 'genitive').first.split("-")[0];
            if(result ===  name){
                return TRANSLATION.en.friendsOf(name);
            }

            return "Друзья " + result;
        },
        people: "Люди",
        photoquests: "Фотоквесты"
    }
};
