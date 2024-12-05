module.exports = {
    LEVEL_CAP: 210,
    LEVEL_SKILL_POINT_FUNCTION: level => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        if (level % 8 == 1 && level <= 100) return 1;
        if (level % 7 == 1 && level <= 118) return 1;
        if (level % 5 == 1 && level <= 200 && level >= 120) return 1;
        if (level % 10 == 1 && level <= 400 && level >= 200) return 1;
        return 0;
    },
};