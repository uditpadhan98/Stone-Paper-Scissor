const selectionButtons=document.querySelectorAll('[data-selection]');
const finalColumn=document.querySelector('[data-final-column]');
const computerScoreSpan=document.querySelector('[data-computer-score]');
const yourScoreSpan=document.querySelector('[data-your-score]');
const SELECTIONS=[
    {
        name:'rock',
        emoji:'✊',
        beats:'scissors'
    },
    {
        name:'paper',
        emoji:'✋',
        beats:'rock'
    },
    {
        name:'scissors',
        emoji:'🤞',
        beats:'paper'
    }
]

selectionButtons.forEach(selectionButtons=>{
    selectionButtons.addEventListener('click',e=>{
        //this will give the selected name...weather a stone or paper or scissor
        const selectionName=selectionButtons.dataset.selection; 
        //this will find the selected item it the global variable declared above (SELECTIONS)
        const selection=SELECTIONS.find(selection=>selection.name===selectionName)
        makeSelection(selection);
    })
})

function makeSelection(selection){
    const computerSelection=randomSelection();
    const yourWinner=isWinner(selection,computerSelection);
    const computerWinner=isWinner(computerSelection,selection);
    // console.log(computerSelection);

    addSelectionResult(computerSelection,computerWinner);
    addSelectionResult(selection,yourWinner);

    if(yourWinner) incrementScore(yourScoreSpan);
    if(computerWinner) incrementScore(computerScoreSpan);
}

function incrementScore(scoreSpan){
    //parseInt convert to integer
    scoreSpan.innerText=parseInt(scoreSpan.innerText)+1;
}

function addSelectionResult(selection,winner){
    const div=document.createElement('div');
    div.innerText=selection.emoji;
    div.classList.add('result-selection');
    if(winner) div.classList.add('winner');
    finalColumn.after(div);
}

function isWinner(selection,opponentSelection){
    return selection.beats===opponentSelection.name;
}

function randomSelection(){
    //this will give a value between 0 and 2 i.e 0.1.2
    const randomIndex=Math.floor(Math.random()*SELECTIONS.length);
    return SELECTIONS[randomIndex];
}