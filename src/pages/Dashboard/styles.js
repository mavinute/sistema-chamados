import styled from 'styled-components'

export const Content = styled.div`
    margin-left: 250px;
    padding: 1px 16px;

    .new {
        display: flex;
        align-items: center;
        justify-content: center;

        float: right;
        margin-bottom: 15px;
        background: #83bf02;
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        border: 0;
        font-weight: 600;
        color: #fff;

        svg {
            margin-right: 5px;
        }

        transition: filter 0.5s;

        &:hover {
            filter: brightness(0.8);
        }
    }

    .container {
        display: flex;
        flex-direction: column;

        background: #f8f8f8;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 10px;
    }

    table {
        border: 1px solid #ccc;
        margin: 0;
        padding: 0;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

        /* caption {
            font-size: 10px;
            margin: 5px 0 10px;
        } */

        tr {
            background: #f8f8f8;
            border: 1px solid #ddd;
        }

        th {
            padding: 5px;
            align-items: center;
            font-size: 16px;
        }

        td {
            padding: 10px;
            text-align: center;

            .action {
                border: 0;
                padding: 6px;
                border-radius: 5px;
                display: inline-block;
                margin-right: 3px;

                svg {
                    vertical-align: middle;
                }
            }

            .badge {
                padding: 3px;
                border-radius: 3px;
                color: #fff;
            }
        }
    }

    @media(max-width:700px){
        margin-left: 0;

        table {
            border: 0;

            thead {
                border: none;
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }

            tr {
                border-bottom: 3px solid #ddd;
                display: block;
                margin-bottom: 10px;
            }

            td {
                border-bottom: 1px solid #ddd;
                display: block;
                font-size: 16px;
                text-align: right;

                
            }

            td::before{
                content: attr(data-label);
                float: left;
                font-weight: bold;
            }
        }
    }
`