import styled from "styled-components";

export const Content = styled.div`
    margin-left: 250px;
    padding: 1px 16px;

    .container {
        display: flex;
        flex-direction: column;

        background: #f8f8f8;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 1px;

            form {
                display: flex;
                flex-direction: column;

                background: #f8f8f8;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 1px;

                label {
                    margin: 15px 0;
                    font-size: 20px;
                }

                select {
                    padding: 8px;
                    font-size: 15px;
                    border: none;
                    max-width: 600px;
                    background: #bdc3c7;

                    &:disabled {
                        cursor: not-allowed;
                    }
                }

                input {
                    padding: 8px;
                    font-size: 15px;
                    border: none;
                    border-radius: 5px;
                    max-width: 600px;
                    background: #bdc3c7;
                }

                textarea {
                    padding: 8px;
                    font-size: 15px;
                    border: none;
                    border-radius: 5px;
                    max-width: 600px;
                    resize: none;
                    height: 105px;
                }

                button {
                    margin: 15px 1px 0;
                    max-width: 600px;
                    background: #181c2e;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    padding: 8px;
                    font-size: 15px;
                }

                .status {
                    display: flex;
                    gap: 10px;
                    margin: 5px 10px 0;
                }
            }

            button {
                    margin: 1px 19px;
                    max-width: 600px;
                    background: #181c2e;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    padding: 8px;
                    font-size: 15px;
            }
    }

    @media(max-width: 700px){
        margin-left: 0;
    }
`