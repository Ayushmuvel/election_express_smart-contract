pragma solidity >=0.4.0 <0.7.0;

contract election{
    
    struct candidates{
        uint ID;
        string email;
        uint vote_count;
    }
    
    struct voters{
        string email;
        bool voted;
    }
    
    uint can_count = 0;
    uint voter_count = 0;
    
    mapping (uint => candidates) can_list;
    mapping (string => voters) vot_list;
    mapping (string => uint) all_email; 
    
    function add_candidate(string memory _email)public{
        can_count = can_count + 1;
        all_email[_email] = can_count;
        can_list[can_count] = candidates(can_count,_email,0);
    }
    
    function add_voter (string memory _email )public{
        vot_list[_email] = voters(_email,false);
    }
    
    function voting_process (string memory vot_email,string memory _email) public {
        require(vot_list[vot_email].voted == false);
        can_list[all_email[_email]].vote_count = can_list[all_email[_email]].vote_count + 1;   
        vot_list[vot_email].voted = true;
    }
    
    function result () view public returns(uint){
        uint max_vote=0;
        uint won_id;
        for (uint i = 1;i <= can_count;i++){
            if ( can_list[i].vote_count > max_vote){
                won_id = i;
            }
        }
        return (won_id);
    }
}