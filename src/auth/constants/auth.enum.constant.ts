enum ENUM_AUTH_LOGIN_WITH {
    CREDENTIALS = 'CREDENTIALS',
    GITHUB = 'GITHUB',
    GOOGLE = 'GOOGLE',
}

enum ENUM_CITIZEN_ID_TYPE {
    OLD = 'old',
    NEW = 'new',
    CCCD_CHIP_NEW = 'cccd_chip_front',
    OLD_BACK = 'old_back',
    NEW_BACK = 'new_back',
    CHIP_FRONT = 'chip_front',
    CHIP_BACK = 'chip_back',
    CCCD_CHIP_NEW_BACK = 'cccd_chip_back',
}

export { ENUM_AUTH_LOGIN_WITH, ENUM_CITIZEN_ID_TYPE };
