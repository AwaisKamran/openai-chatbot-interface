export interface Message {
    id: string,
    sender: string,
    content: string,
    dateTime: Date,
}
export enum MESSAGE_TYPE {
    USER = "user",
    ASSISTANT = "assistant"
}

export interface OpenAIResponse {
    content: string, 
    run_id: string, 
    thread_id: string
}