TRANSLATION = {
    en: {
        of: function (name, gender, what) {
            return name + "'s " + what;
        },
        friendsOf: function (name) {
            return name + "'s Friends";
        },
        photosOf: function (name) {
            return name + "'s Photos";
        },
        photoquestsOf: function (name) {
            return name + "'s Photoquests";
        },
        textOfLikes: function (num) {
            return "likes";
        },
        textOfViews: function (num) {
            return "views";
        },
        createdPQTextInFeed: function (gender) {
            return "Created photoquest";
        },
        publishedPhotoTexInFeed: function (gender) {
            return "Published photo on";
        },
        acceptedYourFriendRequest: function (gender) {
            return "accepted your friend request";
        },
        declinedYourFriendRequest: function (gender) {
            return "declined your friend request";
        },
        commentedYourPhoto: function (gender) {
            return "commented your photo";
        },
        answeredYourComment: function (gender) {
            return "answered your comment";
        },
        likedYourComment: function (gender) {
            return "liked your comment";
        },
        likedYourPhoto: function (gender) {
            return "liked your photo";
        },
        publishedBy: function (gender) {
            return "Published by";
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
        country: "Country",
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
        receivedFriendRequestMessage: " wants to add you as a friend",
        followedUserMessage: function(){
            return " is following you";
        },
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
        back: "Back",
        inPhotoquest: "In photoquest",
        reply: "Reply",
        deleteText: "Delete",
        showMore: "Show More",
        comment: "Comment",
        commentButton: "Comment",
        photo: "photo",
        prev: "Prev",
        next: "Next",
        send: "Send",
        oldPassword: "Old password",
        newPassword: "New password",
        retypeNewPassword: "Retype new password",
        save: "Save",
        mainInformation: "Main information",
        changePassword: "Change password",
        enterYourCountry: "Enter your country",
        enterYourCity: "Enter your city",
        passwordsDoNotMatch: "Passwords do not match",
        passwordWasChanged: "Password was changed",
        monthOfYear: ["Jan", "Feb", "Mar", "Apr", "May",
            "Jun", "Jul", "Aug", "Sep", "Oct",
            "Nov", "Dec"],
        at: "at",
        enterPhotoDescription: "Enter photo description",
        uploadImage: "Upload image",
        noFileSelected: "No file selected",
        selectFile: "Select file",
        publish: "Publish",
        followPhotoquest: "Follow photoquest",
        performYourFirsPhotoques: "Perform your first photoques",
        chooseAvatar: "Choose avatar",
        enterPhotoquestName: "Enter photoquest name",
        only: "Only",
        tagsAreAllowed: "tags are allowed",
        create: "Create",
        deletePhoto: "Delete",
        deletePhotoText: "Delete photo",
        cancel: "Cancel",
        welcomeToPhotoQuest: "Welcome to PhotoQuest",
        firstWelcomeText: "You can perform photoquests and create your own.",
        secondWelcomeText: "Take part in a photo competition with people from all over the world.",
        thirdWelcomeText: "It is a good way to find new friends and get a lot of fun.",
        photoquestLogoText: "PhotoQuest",
        firstPromotext: "We make photography so interesting",
        secondPromoText: "like never before",
        enterCorrectCode: "Enter correct code",
        setAsAvatar: "Set As Avatar",
        loginFailed: "Invalid login or password!",
        unknownError: "Unknown error occurred, try again later",
        loginFieldBlank: "Specify your login, please",
        enterLogin: "Enter login!",
        enterPassword: "Enter password!",
        passwordFieldBlank: "Enter your password, please",
        nameFieldBlank: "Enter your name, please",
        lastNameFieldBlank: "Enter your last name, please",
        genderFieldIsBlank: "Select your gender, please",
        countryFieldIsBlank: "Select your country, please",
        cityFieldIsBlank: "Select your city, please",
        captchaFieldIsBlank: "Enter the code!",
        invalidName: "Your name should contain only letters",
        invalidLastName: "Your last name should contain only letters",
        invalidPasswordPattern: "Your password should be 6-20 characters long",
        invalidLogin: "Your login should be 3-20 characters long and may contain only letters and digits",
        nameIsTooBig: "Name should not contain more than 20 characters",
        lastNameIsTooBig: "Last name should not contain more than 20 characters",
        userExists: function (name) {
            return "Login " + name + " is taken"
        },
        invalidPassword: "Invalid password",
        photoIsNotSelected: "Photo is not selected",
        tooManyTags: function(maxTags) {
            return "You can not specify more than " + maxTags + " tags";
        },
        emptyPhotoquestNameError: "Enter photoquest name",
        photoquestExists: function(photoQuestName) {
            return "Photoquest " + photoQuestName + " already exists"
        },
        smallImageException: function(minWidth, minHeight) {
            return "The image is too small, should be at least " + minWidth + "x" + minHeight;
        },
        newPQ: "New Photoquest",
        addTags: "Enter search tags",
        androidLink: "images/google_play.png",
        siteLink: "images/go_to_site.png",
		photoNotFound: "Photo not found",
		close: "Close",
		shareIt: "Share it",
		pqName: "Photoquest name",
		aboutMyself: "About me",
		addFriends: "add friends",
		noFriedsText: "You have no friends",
		noSedtFriendRequest: "You have no sent friend requests",
		noReceivedFriendRequests: "You have no received friend requests",
		noNewsText: "You have no news. Add friends, follow photoquests and users to get news.",
		noActivityText: "There is not activity yet.",
		skip: "Skip"
    },
    ru: {
        of: function (name, gender, what, whatEn) {
            var person = {
                gender: gender ? 'male' : 'female',
                first: name
            };
            var result = petrovich(person, 'genitive').first.split("-")[0];
            if (result === name) {
                return TRANSLATION.en.of(name, gender, whatEn);
            }

            return what + " " + result;
        },
        friendsOf: function (name, gender) {
            return this.of(name, gender, "Друзья", "Friends");
        },
        photosOf: function (name, gender) {
            return this.of(name, gender, "Фотографии", "Photos");
        },
        photoquestsOf: function (name, gender) {
            return this.of(name, gender, "Фотоквесты", "Photoquests");
        },
        textOfLikes: function (num) {
            num = num || 0;
            if (num == 1) return "лайк";
            var lastDigit = num % 10;
            var strOfNum = num.toString();
            if (strOfNum[strOfNum.length - 1] == "1" && strOfNum[strOfNum.length - 2] == "1") {
                return "лайков";
            }
            if (lastDigit > 0 && lastDigit < 5) {
                if (strOfNum[strOfNum.length - 2] == "1")return "лайков";
                else if (lastDigit == 1)return "лайк";
                else return "лайка";
            }
            else  return "лайков";
        },
        textOfViews: function (num) {
            if (num == 1) return "просмотр";
            var lastDigit = num % 10;
            var strOfNum = num.toString();
            if (strOfNum[strOfNum.length - 1] == "1" && strOfNum[strOfNum.length - 2] == "1") {
                return "просмотров";
            }
            if (lastDigit > 0 && lastDigit < 5) {
                if (strOfNum[strOfNum.length - 2] == "1")return "просмотров";
                else if (lastDigit == 1)return "просмотр";
                else return "просмотра";
            }
            else  return "просмотров";
        },
        createdPQTextInFeed: function (gender) {
            if (gender === true) return "Создал фотоквест";
            if (gender == false) return "Создала фотоквест";
        },
        publishedPhotoTexInFeed: function (gender) {
            if (gender == true) return "Опубликовал фото в фотоквесте";
            if (gender == false) return "Опубликовала фото в фотоквесте";
        },
        acceptedYourFriendRequest: function (gender) {
            if (gender == true) return "Принял Ваше предложение дружбы";
            if (gender == false) return "Приняла Ваше предложение дружбы";
        },
        declinedYourFriendRequest: function (gender) {
            if (gender == true) return "Отклонил Ваше предложение дружбы";
            if (gender == false) return "Отклонила Ваше предложение дружбы";
        },
        commentedYourPhoto: function (gender) {
            if (gender == true) return "прокомментировал Ваше фото";
            if (gender == false) return "прокомментировала Ваше фото";
        },
        answeredYourComment: function (gender) {
            if (gender == true) return "ответил на Ваш комментарий";
            if (gender == false) return "ответила на Ваш комментарий";
        },
        likedYourComment: function (gender) {
            if (gender == true) return "лайкнул Ваш комментарий";
            if (gender == false) return "лайкнула Ваш комментарий";
        },
        likedYourPhoto: function (gender) {
            if (gender == true) return "лайкнул Ваше фото";
            if (gender == false) return "лайкнула Ваше фото";
        },
        publishedBy: function (gender) {
            if (gender == true) return "Опубликовал";
            if (gender == false) return "Опубликовала";
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
        follow: "Подписаться",
        unfollow: "Отписаться",
        createdBy: "Создатель",
        sentRequests: "Отправленные",
        receivedRequests: "Полученные",
        sentFriendRequests: "Отправленные предложения дружбы",
        receivedFriendRequests: "Полученные предложения дружбы",
        accept: "Принять",
        decline: "Отклонить",
        writeMessage: "Написать сообщение",
        receivedFriendRequestMessage: "хочет добавить вас в друзья",
        followedUserMessage: function(gender) {
            if(gender === true) {
                return " подписан на вас";
            }

            if(gender === false) {
                return " подписана на вас";
            }

            return "Error";
        },
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
        back: "Вернуться",
        inPhotoquest: "В фотоквесте",
        reply: "Ответить",
        deleteText: "Удалить",
        showMore: "Показать больше",
        comment: "комментарий",
        commentButton: "Комментировать",
        photo: "фото",
        prev: "Предыдущая",
        next: "Следующая",
        send: "Отправить",
        oldPassword: "Старый пароль",
        newPassword: "Новый пароль",
        retypeNewPassword: "Повторите новый пароль",
        save: "Сохранить",
        mainInformation: "Основная информация",
        changePassword: "Сменить пароль",
        enterYourCountry: "Введите Вашу страну",
        enterYourCity: "Введите Ваш город",
        passwordsDoNotMatch: "Пароли не совпадают",
        passwordWasChanged: "Пароль был изменен",
        monthOfYear: ["Янв", "Фев", "Март", "Апр", "Май",
            "Июнь", "Июль", "Авг", "Сент", "Окт",
            "Нояб", "Дек"],
        at: "в",
        enterPhotoDescription: "Описание к фото",
        uploadImage: "Загрузить Фотографию",
        noFileSelected: "Файл не выбран",
        selectFile: "Выбрать файл",
        publish: "Опубликовать",
        followPhotoquest: "Подписаться на фотоквест",
        performYourFirsPhotoques: "Выполните свой первый фотоквест",
        chooseAvatar: "Выберете аватар",
        enterPhotoquestName: "Имя фотоквеста",
        only: "Только",
        tagsAreAllowed: "теги разрешены",
        create: "Создать",
        deletePhoto: "Удалить",
        deletePhotoText: "Удалить фото",
        cancel: "Отменить",
        welcomeToPhotoQuest: "Добро пожаловать в PhotoQuest",
        firstWelcomeText: "Вы можете выполнять фотоквесты и создавать собственные.",
        secondWelcomeText: "Участвуйте в фотоконкурсах с людьми со всего мира.",
        thirdWelcomeText: "Это хороший способ найти новых друзей и получить массу удовольствия.",
        photoquestLogoText: "PhotoQuest",
        firstPromotext: "С нами фотографирование стало намного интереснее",
        secondPromoText: "",
        enterCorrectCode: "Неверный защитный код",
        setAsAvatar: "Сделать Аватаром",
        loginFailed: "Неправильный логин или пароль!",
        unknownError: "Произошла неизвестная ошибка, попробуйте позже!",
        enterLogin: "Введите логин!",
        enterPassword: "Введите пароль!",
        loginFieldBlank: "Пожалуйста, укажите ваш логин",
        passwordFieldBlank: "Пожалуйста, введите ваш пароль",
        nameFieldBlank: "Пожалуйста, укажите ваше имя",
        lastNameFieldBlank: "Пожалуйста, укажите вашу фамилию",
        genderFieldIsBlank: "Пожалуйста, укажите ваш пол",
        countryFieldIsBlank: "Выберете страну, пожалуйста",
        cityFieldIsBlank: "Выберете город, пожалуйста",
        captchaFieldIsBlank: "Введите защитный код",
        invalidName: "Ваше имя может содержать только буквы",
        invalidLastName: "Ваша фамилия может содержать только буквы",
        invalidPasswordPattern: "Ваш пароль должен быть длиной 6-20 символов",
        invalidLogin: "Ваш Логин должен быть длиной 3-20 символов и может содержать только латинские буквы и цифры",
        nameIsTooBig: "Имя не должно содержать более 20 символов",
        lastNameIsTooBig: "Фамилия не должна содержать более 20 символов",
        userExists: function (name) {
            return "Пользователь с логином " + name + " уже зарегистрирован"
        },
        invalidPassword: "Неверный пароль",
        photoIsNotSelected: "Фотография не выбрана",
        tooManyTags: function(maxTags) {
            return "Вы не можете указать больше " + maxTags + " тегов";
        },
        emptyPhotoquestNameError: "Введите имя фотоквеста",
        photoquestExists: function(photoQuestName) {
            return "Фотоквест " + photoQuestName + " уже существует"
        },
        smallImageException: function(minWidth, minHeight) {
            return "Слишком маленькое изображение, должно быть как минимум " + minWidth + " на " + minHeight;
        },
        newPQ: "Новый Фотоквест",
        addTags: "Добавте теги для поиска",
        androidLink: "images/googleplay_rus.png",
        siteLink: "images/go_to_site_rus.png",
		photoNotFound: "Фото не найдено",
		close: "Закрыть",
		shareIt: "Поделиться",
		pqName: "Название фотоквеста",
		aboutMyself: "О себе",
		addFriends: "добавить друзей",
		noFriedsText: "У вас нет друзей",
		noSedtFriendRequest: "Вы не подавали предлодения дружбы",
		noReceivedFriendRequests: "Вы не получали предложение дружбы",
		noNewsText: "У вас нет новостей. Добавляйте друзей, подписывайтесь на фотоквесты и людей что бы получать новости.",
		noActivityText: "Еще нет активности",
		skip: "Пропустить"
    },
    uk: this.ru,
    kk: this.ru,
    be: this.ru,
    ka: this.ru,
    az: this.ru,
    hy: this.ru
};

Utilities.addProperties(TRANSLATION.en, TRANSLATION.general);
Utilities.addProperties(TRANSLATION.ru, TRANSLATION.general);
