const locations = [
    {
        text: `Tralina! I'm so glad you're here! Today's supposed to be a special day, and I need your help to make sure it's actually special.
        So you know how we got you the Heckler for an anniversary present?
        Well... during this time of stay-at-home orders, I've been imagining
        traveling around the world with you and Brooke, and I've also been
        thinking about your new bike. Unfortunately, during all of this
        imagining, I've somehow managed to imaginarily lose your bike in one
        of the countries I've been imagining. And you know how bad I am with
        geography... So will you imagine traveling the world with Brooke and
        me to retrace my imaginary steps and help me find your bike...?`,
        incorrect: `Pleeeeeaaase... if you'll help me, just say, "yes"`,
        question: 'Will you help me?',
        answer: /yes|sure|you bet|absolutely|definitely|ok|fine/i,
        image: 'home.jpg'
    },
    {
        text: `Great! I think the first country I imagined was west of the Caspian sea. I want to say the name of the capital of the country started with a \"B\"...?`,
        incorrect: `Hmm, no, that wasn't it. I remember now the name of the capital is Baku and it's kind of southeast of Georgia...`,
        question: 'Which country next?',
        answer: /azerbaijan/i,
        image: 'home.jpg'
    },
    {
        text: `Ah yes! Azerbaijan. From there I think I imagined myself to the
        west... There's a river that runs through the city. I think it's called the Seine?`,
        incorrect: `I don't think so... For some reason I associate this city with a school in Indiana.`,
        question: `Which city was that?`,
        answer: /paris/i,
        image: 'azerbaijan.png'
    },
    {
        text: `Oh yeah - Paris! We've been there before 😀. I think from there my mind floated across the channel to a country that contains other countries.`,
        incorrect: `Not that one... I remember it can be abbreviated with two letters.`,
        question: `Which country was that?`,
        answer: /u\.?k\.?|united kingdom/i,
        image: 'paris.jpg'
    },
    {
        text: `Yes - the United Kingdom! What a beautiful, yet rainy place. We should go visit there in real life one of these days. You remember the country we went to on our honeymoon? Well, if I recall correctly, the next country I imagined was just south of where we honeymooned.`,
        incorrect: `That's not right... This country is probably most famous for its canal.`,
        question: `Which country was it?`,
        answer: /panama/i,
        image: 'stonehenge.jpg'
    },
    {
        text: `That's right - Panama! I don't really know anything about Panama... I guess my imagination must have been pretty active. I remember from there, I drifted down South America... way down, but east of the Andes.`,
        incorrect: `Ah, no - not that one. I believe it's west of Uruguay.`,
        question: `Which country next?`,
        answer: /argentina/i,
        image: 'panama.jpg'
    },
    {
        text: `Of course, Argentina. I've always wanted to visit the Andes. I
        went up to North America after that. I visited the first city of over
        300,000 people that you'd reach if you floated southeast from
        Detroit. Weird that I can remember those details but can't bring to
        mind the name of the city.`,
        incorrect: `No, I don't think so. They also have one of the drabbest sports teams in any league.`,
        question: `What's the name of that city?`,
        answer: /cleveland/i,
        image: 'argentina.jpg'
    },
    {
        text: `Cleveland. Cleveland rocks, I guess. Not sure why I imagined
        myself there. I went really far after that, I know. There were a lot
        of people with a certain virus there. More people than their
        goverment wants to admit...`,
        incorrect: `No, it wasn't that one. They eat a lot of rice there, I know.`,
        question: `What is that country?`,
        answer: /china/i,
        image: 'cleveland.jpg'
    },
    {
        text: `China, yes. It's a beautiful place... Or at least it has beautiful places. I remember wandering from there to a really small country. Like, the smallest country.`,
        incorrect: `No, this country is so small it's also a city.`,
        question: `What country is that?`,
        answer: /vatican/i,
        image: 'china.jpg'
    },
    {
        text: `There it is! Who would have thought it would be in the Vatican
        of all places! I'm glad we finally found it. I'm so proud of you,
        Tralina - not just because you helped me find this imaginary bicycle,
        but because you help me as my partner in life day in and day out. I'm
        so proud to be married to you these six years, and I'm so happy to be
        starting our wonderful little family. Hopefully we'll be able to
        travel the world as a family for real soon! And hopefully I don't
        lose your bike for real! (Or anything else for that matter...) I love
        you, Babes! Happy Anniversary! Steve`,
        image: `heckler-in-vatican.jpg`
    }
];

let state = {
    currentLocation: 0,
    incorrect: false
};

function render(state) {
    const isLastLocation = state.currentLocation >= locations.length - 1;
    const location = locations[state.currentLocation];
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    wrapper.style.backgroundImage = `url(img/${location.image})`;

    const content = document.createElement('div');
    content.id = 'content';

    const paragraph = document.createElement('p');
    const text = document.createTextNode(state.incorrect ? location.incorrect : location.text);
    paragraph.appendChild(text);
    content.appendChild(paragraph);

    let input = null;
    if (!isLastLocation) {
        const form = document.createElement('form');
        form.onsubmit = (e) => {
            const input = document.querySelector('input[name=country]');
            if (input.value.match(location.answer)) {
                state = {...state, currentLocation: state.currentLocation + 1, incorrect: false};
            } else {
                state = {...state, incorrect: true};
            }
            render(state);
        };
        input = document.createElement('input');
        input.name = 'country';
        input.type = 'text';
        input.placeholder = location.question;
        form.appendChild(input);
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Go';
        form.appendChild(button);

        content.appendChild(form);
    }

    wrapper.appendChild(content);
    const oldWrapper = document.getElementById('wrapper');
    oldWrapper.replaceWith(wrapper)
}

window.addEventListener('DOMContentLoaded', () => {
    render(state);
});