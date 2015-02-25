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
        photoquests: "Photoquests",
        profile: "Profile",
        messages: "Messages",
        friends: "Friends",
        myPhotoquests: "My photoquests",
        myPhotos: "My photos",
        news: "News",
        replies: "Replies",
        settings: "Settings",
        signOut: "Sign out",
        login: "Login",
        password: "Password",
        signIn: "Sign in",
        register: "Register",
        byName: "By name",
        country: "country",
        city: "City",
        sortBy: "Sort by",
        gender: "Gender",
        search: "Search",
        regDate: "Registration date",
        rating: "Rating",
        selectGender: "Select gender",
        male: "Male",
        female: "Female",
        registration: "Registration",
        name: "Name",
        lastName: "Last name",
        code: "Security code"
        
        
        
        
        
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
        photoquests: "Фотоквесты",
        profile: "Профайл",
        messages: "Сообщения",
        friends: "Друзья",
        myPhotoquests: "Мои фотоквесты",
        myPhotos: "Мои фотографии",
        news: "Новости",
        replies: "Ответы",
        settings: "Настройки",
        signOut: "Выход",
        login: "Логин",
        password: "Пароль",
        signIn: "Вход",
        register: "Регистрация",
        byName: "Имя",
        country: "Страна",
        city: "Город",
        sortBy: "Сортировка",
        gender: "Пол",
        search: "Поиск",
        regDate: "Дата регистрации",
        rating: "Рейтинг",
        selectGender: "Выберите пол",
        male: "Мужской",
        female: "Женский",
        registration: "Регистрация",
        name: "Имя",
        lastName: "Фамилия",
        code: "Защитный код"
    }
};
