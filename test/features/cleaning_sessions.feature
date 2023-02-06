Feature: [Cleaning Sessions] Navigate an imaginary robotic hoover through an equally imaginary room
    As a client
    I want to POST to /cleaning-sessions with a body that contains room dimensions, locations of patches of dirt, initial hover position and driving instructions
    So that I can recieve final hoover position and number of patches of dirt cleaned up

    Scenario Outline: I want to POST to /cleaning-sessions with a body that is valid
        Given I have a <body> for a request to /cleaning-sessions
        When I make a POST requst to /cleaning-sessions
        Then I should recieve a successful <response> for my request

        Examples:
            | body | response |
            | "valid.common.persona"  | "200" |
            | "invalid.roomsize.persona"  | "200" |
            | "invalid.coords.persona"  | "200" |
            | "invalid.patches.persona"  | "200" |

    Scenario Outline: I want to POST to /cleaning-sessions with a body that is invalid
        Given I have an invalid <body> for a request to /cleaning-sessions
        When I make a POST requst to /cleaning-sessions
        Then I should recieve an unsuccessful <response> for my request

        Examples:
            | body | response |
            | "invalid.common.persona"  | "400" |
            | "invalid.instructions.persona"  | "400" |
            | "invalid.all.persona"  | "400" |

    # Scenario: I want to POST to /cleaning-sessions with a body that has a conflicting start position
    # Scenario: I want to POST to /cleaning-sessions with a body that has duplicate dirt patches
    # Scenario: I want to POST to /cleaning-sessions with a body that has instructions that supercede the number of dirt patches
    # Scenario: I want to POST to /cleaning-sessions with a body that has instructions that precede the number of dirt patches
    # Scenario: I want to POST to /cleaning-sessions with a body that has an uneven room size
