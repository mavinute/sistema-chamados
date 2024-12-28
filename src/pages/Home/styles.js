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

    .grid-products{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        
        width: 100%;

        .product {
            display: flex;
            align-items: start;
            justify-content: center;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
            background: #fff;
            margin: 10px;

            .data-product {
                display: flex;
                flex-direction: column;
                gap: 8px;
                width: 100%;

                .action {
                    width: 100%;
                    height: 30px;
                    background: #0063be;
                    border: 0;
                    border-radius: 5px;
                    size: 15px;
                    color: #fff;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            img {
                width: 200px;
                height: 180px;
                margin-bottom: 12px;
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