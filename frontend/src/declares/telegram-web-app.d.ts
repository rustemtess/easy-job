declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string;
                initDataUnsafe: {
                    user: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                    };
                };
                version: string;
                platform: string;
                close: () => void;
                expand: () => void;
                isExpanded: boolean;
                sendData: (data: string) => void;
                onEvent: (eventType: string, callback: () => void) => void;
                offEvent: (eventType: string, callback: () => void) => void;
            };
        };
    }
}

export {};
