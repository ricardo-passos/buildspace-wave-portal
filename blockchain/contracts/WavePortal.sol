// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 public totalwaves;

    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] public waves;

    mapping(address => uint256) public lastWavedAt;
    uint256 constant cooldown = 15 minutes;

    constructor() payable {
        console.log("I AM SMART CONTRACT. POG.");

        seed = (block.difficulty * block.timestamp) % 100;

        console.log("initial difficulty %d", seed);
    }

    function wave(string memory _message) public {
        uint256 currentTimestamp = block.timestamp;

        require(
            currentTimestamp > lastWavedAt[msg.sender] + cooldown,
            "Wait 15 min before waving again"
        );

        lastWavedAt[msg.sender] = currentTimestamp;

        ++totalwaves;

        console.log('%s has waved with message "%s"', msg.sender, _message);

        Wave memory newWave = Wave(msg.sender, _message, block.timestamp);

        waves.push(newWave);

        seed = (block.difficulty * block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;

            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
