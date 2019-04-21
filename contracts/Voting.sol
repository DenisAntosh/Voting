pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Voting 
{
    uint public numberOfParticipants;
    uint public numberOfEmployees;
    
    address public director;
    
    mapping(address => Results) public participants;
    mapping(address => bool) public employees;
    
    event Connection(address conecter);
    event Nominate(address nominator);
    event Voted(address voter);
    event AllVoted(bool res);

    struct Results
    {
        uint  numberOfVote;
        bool  isDirector;
    }
    
    address[11] public addEmployees = [ 0x5d9b1F4c81ac9c4B3b644cd08C9B5f43a8fE9B3b,
                                        0xcB431D9E3dcd4133b8d47352973828BC03d85D70,
                                        0x7d6b1BbF3130364b99a5C4aE9E131FCfbB6aaBC3,
                                        0x416712a6F1218C43F626559aEf908c5348130989,
                                        0x961719A539dd93b9561cF65666Cb6Bc3563812CD,
                                        0xa300dB82Ea63B7D168D545B6018A4A01f6c0ee92,
                                        0xd484004e1E90176D5F5f88020758e8FB49bEd369,
                                        0x94340fFc3853667Fd58b4d128A8c0d646b2ae92F,
                                        0x7e503a98b1f45081B5cd917361C89b32C779830F,
                                        0xf2840678b5236F6DF6ae352E21756d8eB0BA03da
    ];
    address[6] public addParticipants;
    
    constructor () public   
    {
        numberOfParticipants = 0;
        numberOfEmployees = 0;
    }
    
    function initToNull() public
    {
        for(uint i = 0; i<numberOfEmployees; i++)
        {
            employees[addEmployees[i]] = false;
        }
        
        for(i = 0; i<numberOfParticipants; i++)
        {
            participants[addParticipants[i]].numberOfVote = 0;
            participants[addParticipants[i]].isDirector = false;
            addParticipants[i] = 0x0;
        }
        numberOfEmployees = 0;  
        numberOfParticipants = 0;
        director = 0x0;
    }

    function connectFromVoting() public
    {
        emit Connection(msg.sender);
        employees[msg.sender] = false;
        numberOfEmployees++; 
    }

    function nominateTheCandidacy() public 
    {
        //verify that the employee did not press the button twice
        for(uint i = 0; i<numberOfParticipants; i++)
        {
            if(addParticipants[i] == msg.sender)
            {
                return;
            }
        }
        // put the employee in an array of participants
        addParticipants[numberOfParticipants] = msg.sender;
        numberOfParticipants++;
        participants[addParticipants[numberOfParticipants]].numberOfVote = 0;
        participants[addParticipants[numberOfParticipants]].isDirector = false;
        emit Nominate(msg.sender);
    }
    
    function voteFor(address _participant) public
    {
        // check if the employee has not voted before
        if(employees[msg.sender] == false)
        {
            emit Voted(msg.sender);
            participants[_participant].numberOfVote++;
            employees[msg.sender] = true;
        }
    }
    
    function everyoneVoted() view public returns (bool)
    {
        for(uint i = 0; i<numberOfEmployees; i++)
            if(employees[addEmployees[i]] == false)
            {
                emit AllVoted(false);
                return false;
            }
        emit allVoted(true);
        return true;
    }

    function resultOfVoting() public
    {
        if(everyoneVoted()) 
        {
            // we are looking for who has the maximum number of votes
            uint maxIndex = 0;
            director = addParticipants[maxIndex];
            participants[addParticipants[maxIndex]].isDirector = true;
            Results max = participants[addParticipants[maxIndex]];
            for(uint i = 1; i<numberOfParticipants; i++) 
            {
                if(participants[addParticipants[i]].numberOfVote > max.numberOfVote)
                {
                    participants[addParticipants[maxIndex]].isDirector = false;
                    maxIndex = i;
                    participants[addParticipants[i]].isDirector = true;
                    director = addParticipants[i];
                    max = participants[addParticipants[i]];
                }
            }      
            //if there are participants with the same maximum number of votes, we vote again
            for(i = 0; i<numberOfParticipants; i++)
                if(participants[addParticipants[i]].numberOfVote == max.numberOfVote && i != maxIndex)
                {
                    director = 0x0;
                    for(uint j = 0; j<numberOfEmployees; j++)
                    {
                        employees[addEmployees[j]] == false;
                    }
                    for(j = 0; j<numberOfParticipants; j++)
                    {
                        participants[addParticipants[j]].numberOfVote = 0;
                        participants[addParticipants[j]].isDirector = false;
                    }
                }
            }
    }    
}