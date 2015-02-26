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
        textOfLikes: function(num){
            return "лайков";   
        }, 
        createdPQTextInFeed: function(gender){
            return "Created photoquest";
        },
        publishedPhotoTexInFeed: function(gender){
            return "Published photo on";
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
        code: "Security code",
        newest: "Newest",
        mostRated: "Most rated",
        hottest: "Hottest",
        all: "All",
        mine: "Mine",
        friendsPhotos: "Friends",
        created: "Created",
        following: "Following",
        performed: "Performed",
        followingPQ: "Following photoquests",
        createdPQ: "Created photoquests",
        performedPQ: "Performed photoquests",
        createPQ: "Create PhotoQuest",
        perform: "Perform",
        follow: "Follow",
        unfollow: "Unfollow",
        createdBy: "Created by",
        sentRequests: "Send requests",
        receivedRequests: "Received requests",
        sentFriendRequests: "Sent Friend Requests",
        receivedFriendRequests: "Received Friend Requests",
        accept: "Accept",
        decline: "Decline",
        writeMessage: "Write message",
        receivedFriendRequestMessage: "wants to add you as a friend",
        removeFriend: "Remove friend",
        cancelFriendRequest: "Cancel friend request",
        addFriend: "Add friend",
        photos: "Photos",
        publishPhoto: "Publish Photo",
        changeAvatar: "Change Avatar",
        activity: "Activity",
        declineFriendRequest: "Decline friend request",
        photoquest: "photoquest",
        dialogs: "Dialogs",
        founders: "Founders",
        softwareDeveloper: "Software Developer",
        conceptDesigner: "Concept Designer",
        coFounder: "Co-Founder",
        webDeveloper: "Web Developer",
        includingYou: "including You",
        back: "Back"
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
        textOfLikes: function(num){
          if(num==1) return "лайк";
          var lastDigit = num%10;
          var strOfNum = num.toString();
          if(strOfNum[strOfNum.length-1]=="1" && strOfNum[strOfNum.length-2]=="1"){
            return "лайков";
          }
          if(lastDigit>0 && lastDigit<5) 
          {
            if (strOfNum[strOfNum.length-2]=="1" )return "лайков";
            else if(lastDigit==1)return "лайк";
            else return "лайка";
          }
          else  return "лайков";
        },
        createdPQTextInFeed: function(gender){
            if(gender===true) return "Создал фотоквест";
            if(gender==false) return "Создала фотоквест";
        },
        publishedPhotoTexInFeed: function(gender){
            if(gender==true) return "Опубликовал фото в фотоквесте";
            if(gender==false) return "Опубликовала фото в фотоквесте";
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
        code: "Защитный код",
        newest: "Новые",
        mostRated: "По рейтингу",
        hottest: "Топ новых",
        all: "Все",
        mine: "Мои",
        friendsPhotos: "Друзей",
        created: "Созданные",
        following: "Следуемые",
        performed: "Выполненные",
        followingPQ: "Следуемые фотоквесты",
        createdPQ: "Созданные фотоквесты",
        performedPQ: "Выполненные фотоквесты",
        createPQ: "Создать Фотоквест",
        perform: "Выполнить",
        follow: "Следовать",
        unfollow: "Не следовать",
        createdBy: "Создал",
        sentRequests: "отправленные",
        receivedRequests: "полученные",
        sentFriendRequests: "Отправленные предложения дружбы",
        receivedFriendRequests: "Полученные предложения дружбы",
        accept: "Принять",
        decline: "Отклонить",
        writeMessage: "Написать сообщение",
        receivedFriendRequestMessage: "хочет добавить вас в друзья",
        removeFriend: "Удалить с друзей",
        cancelFriendRequest: "Отменить предложение дружбы",
        addFriend: "Добавить в друзья",
        photos: "Фотографии",
        publishPhoto: "Опубликовать фото",
        changeAvatar: "Изменить аватар",
        activity: "Активность",
        declineFriendRequest: "Отклонить предложение дружбы",
        photoquest: "",
        dialogs: "Диалоги",
        founders: "Создатели",
        softwareDeveloper: "Разработчик программного обеспечения",
        conceptDesigner: "Концепт дизайнер",
        coFounder: "Сооснователь",
        webDeveloper: "Веб разработчик",
        includingYou: "включая Ваш",
        back: "Вернуться"
    }
};
