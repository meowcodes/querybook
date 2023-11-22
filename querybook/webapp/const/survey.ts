export enum SurveyType {
    TABLE_SEARCH = 'tableSearch',
    TABLE_TRUSTWORTHIESS = 'tableTrustworthiness',
    TEXT_2_SQL = 'text2sql',
    QUERY_AUTHORING = 'queryAuthoring',
}

export const SurveyTypeToQuestion: Record<SurveyType, string> = {
    [SurveyType.TABLE_SEARCH]: 'Did this search help you find the right table?',
    [SurveyType.TABLE_TRUSTWORTHIESS]: 'Do you trust <table_name>?',
    [SurveyType.TEXT_2_SQL]: 'Was Text2SQL helpful with your task?',
    [SurveyType.QUERY_AUTHORING]:
        'Were you able to write this query efficiently?',
};
