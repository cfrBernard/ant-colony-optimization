const AntStates = {
    DEATH: 'death',
    IDLE: 'idle',
    IDLE_FOOD: 'idle_food',
    WALK: 'walk',
    WALK_FOOD: 'walk_food'
};

const AntAnimations = {
    [AntStates.DEATH]: {
        frameCount: 8,   
        frameDelay: 3,   
    },
    [AntStates.IDLE]: {
        frameCount: 8,   
        frameDelay: 10,   
    },
    [AntStates.IDLE_FOOD]: {
        frameCount: 8,  
        frameDelay: 10,   
    },
    [AntStates.WALK]: {
        frameCount: 8,   
        frameDelay: 5,   
    },
    [AntStates.WALK_FOOD]: {
        frameCount: 8,   
        frameDelay: 5,   
    }
};

export { AntStates, AntAnimations };
