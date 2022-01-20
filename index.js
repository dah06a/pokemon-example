const container = document.querySelector('#container');
const message = document.querySelector('#message');
const optionButtons = document.querySelector('#optionButtons');
let state = { 
    pokemonData: [],
    playerName: '',
    currLocation: 'city',
    currPokemon: [] 
};

async function getPokemonData(numOfPokemon) {
    for (let i = 1; i <= numOfPokemon; i++) {
        try {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                state.pokemonData.push(data);
            });
        } catch(e) {
            console.error(e);
        }
    }
}

function startGame() {
    state = { 
        pokemonData: [],
        playerName: '',
        currLocation: 'city',
        currPokemon: []
    };
    getPokemonData(151);
    showMessageNode(1);
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextMessageNodeId = option.nextMessage;
    if (nextMessageNodeId <= 0) {
        return startGame();
    } 
    state = Object.assign(state, option.setState(state));
    showMessageNode(nextMessageNodeId);
}

function getButtonType(index) {
    if (index === 0) return 'btn-outline-success';
    else if (index === 1) return 'btn-outline-warning';
    else if (index === 2) return 'btn-outline-primary';
    else if (index === 3) return 'btn-outline-info';
    else if (index === 4) return 'btn-outline-dark';
    else return 'btn-outline-danger';
}

function showMessageNode(messageNodeIndex) {
    const currentNode = messageNodes.find(node => node.id === messageNodeIndex);
    container.style.backgroundImage = `url(./img/${currentNode.location}.jpg)`;
    message.innerText = currentNode.text(state);
    
    while (optionButtons.firstChild) { // Remove all option buttons
        optionButtons.removeChild(optionButtons.firstChild);
    }

    currentNode.options.forEach((option, index) => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn', getButtonType(index), 'w-25', 'm-2');
            button.addEventListener('click', () => selectOption(option));
            optionButtons.appendChild(button);
        }
    });
}

const messageNodes = [
    {
        id: 1,
        location: 'city',
        text: () => 'Welcome to the exciting world of Pokemon!',
        options: [
            { 
                text: 'Start', 
                setState: () => null,
                nextMessage: 2 
            },
        ]
    },
    {
        id: 2,
        location: 'city',
        text: () => 'What is your name?',
        options: [
            { 
                text: 'Ash', 
                setState: () => ({ playerName: 'Ash' }),
                nextMessage: 3 
            },
            { 
                text: 'Brock', 
                setState: () => ({ playerName: 'Brock' }),
                nextMessage: 3 
            },
            { 
                text: 'Misty', 
                setState: () => ({ playerName: 'Misty' }),
                nextMessage: 3 
            }
        ],
    },
    {
        id: 3,
        location: 'city',
        text: (currentState) => `Nice to meet you ${currentState.playerName}!  I'm professor Oak.`,
        options: [
            { 
                text: 'Thanks', 
                setState: () => null,
                nextMessage: 4 
            },
        ]
    },
    {
        id: 4,
        location: 'city',
        text: (currentState) => `To begin your journey ${currentState.playerName}, you must choose a pokemon.  Which would you like?`,
        options: [
            { 
                text: 'Bulbasaur',
                setState: (currentState) => ({ currPokemon: [...currentState.currPokemon, currentState.pokemonData[0]] }),
                nextMessage: 5
            },
            { 
                text: 'Charmander',
                setState: (currentState) => ({ currPokemon: [...currentState.currPokemon, currentState.pokemonData[3]] }),
                nextMessage: 5
            },
            { 
                text: 'Squirtle',
                setState: (currentState) => ({ currPokemon: [...currentState.currPokemon, currentState.pokemonData[6]] }),
                nextMessage: 5
            },
        ]
    },
    {
        id: 5,
        location: 'city',
        text: (currentState) => `Wonderful - ${currentState.currPokemon[0].name} is a great choice to start your new adventure.`,
        options: [
            {
                text: 'Thanks',
                setState: () => null,
                nextMessage: 6
            }
        ]
    },
    {
        id: 6,
        location: 'city',
        text: () => 'Where would you like to go now?`',
        options: [
            {
                text: 'Forest',
                setState: () => ({ currLocation: 'forest' }),
                nextMessage: 7
            },
            {
                text: 'Canyon',
                setState: () => ({ currLocation: 'canyon' }),
                nextMessage: 8
            },
            {
                text: 'Coast',
                setState: () => ({ currLocation: 'coast' }),
                nextMessage: 9
            },
            {
                text: 'Glacier',
                setState: () => ({ currLocation: 'glacier' }),
                nextMessage: 10
            },
            {
                text: 'Cave',
                setState: () => ({ currLocation: 'cave' }),
                nextMessage: 11
            },
            {
                text: 'Volcano',
                setState: () => ({ currLocation: 'volcano' }),
                nextMessage: 12
            }
        ]
    },
    {
        id: 7,
        location: 'forest',
        text: (currentState) => `What would you like to investigate at the ${currentState.currLocation}?`,
        options: [
            {
                text: 'Tall Grass',
                setState: () => ({ searchTallGrass: true }),
                nextMessage: 20
            },
            {
                text: 'Trainers',
                setState: () => ({ trainerEncounter: true }),
                nextMessage: 30
            },
            {
                text: 'Back To City',
                setState: () => null,
                nextMessage: 6
            }
        ]
    },
    {
        id: 8,
        location: 'canyon',
        text: (currentState) => `What would you like to investigate at the ${currentState.currLocation}?`,
        options: [
            {
                text: 'Tall Grass',
                setState: () => ({ searchTallGrass: true }),
                nextMessage: 20
            },
            {
                text: 'Trainers',
                setState: () => ({ trainerEncounter: true }),
                nextMessage: 30
            },
            {
                text: 'Back To City',
                setState: () => null,
                nextMessage: 6
            }
        ]
    },
    {
        id: 9,
        location: 'coast',
        text: (currentState) => `What would you like to investigate at the ${currentState.currLocation}?`,
        options: [
            {
                text: 'Tall Grass',
                setState: () => ({ searchTallGrass: true }),
                nextMessage: 20
            },
            {
                text: 'Trainers',
                setState: () => ({ trainerEncounter: true }),
                nextMessage: 30
            },
            {
                text: 'Back To City',
                setState: () => null,
                nextMessage: 6
            }
        ]
    },
    {
        id: 10,
        location: 'glacier',
        text: (currentState) => `What would you like to investigate at the ${currentState.currLocation}?`,
        options: [
            {
                text: 'Tall Grass',
                setState: () => ({ searchTallGrass: true }),
                nextMessage: 20
            },
            {
                text: 'Trainers',
                setState: () => ({ trainerEncounter: true }),
                nextMessage: 30
            },
            {
                text: 'Back To City',
                setState: () => null,
                nextMessage: 6
            }
        ]
    },
    {
        id: 11,
        location: 'cave',
        text: (currentState) => `What would you like to investigate at the ${currentState.currLocation}?`,
        options: [
            {
                text: 'Tall Grass',
                setState: () => ({ searchTallGrass: true }),
                nextMessage: 20
            },
            {
                text: 'Trainers',
                setState: () => ({ trainerEncounter: true }),
                nextMessage: 30
            },
            {
                text: 'Back To City',
                setState: () => null,
                nextMessage: 6
            }
        ]
    },
    {
        id: 12,
        location: 'volcano',
        text: (currentState) => `What would you like to investigate at the ${currentState.currLocation}?`,
        options: [
            {
                text: 'Tall Grass',
                setState: () => ({ searchTallGrass: true }),
                nextMessage: 20
            },
            {
                text: 'Trainers',
                setState: () => ({ trainerEncounter: true }),
                nextMessage: 30
            },
            {
                text: 'Back To City',
                setState: () => null,
                nextMessage: 6
            }
        ]
    }
];

startGame();
