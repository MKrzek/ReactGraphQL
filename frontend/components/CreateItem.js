import React, { Component } from 'react'
import {Mutation} from "react-apollo"
import Router from "next/router"
import Form from "./styles/Form"
import gql from "graphql-tag"
import Error from "./ErrorMessage"


const CREATE_ITEM_MUTATION=gql`
mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
    ){
    createItem(
        title:$title
        description:$description
        image:$image
        largeImage:$largeImage
        price:$price
        ){
            id
        }
    }
`;

 class CreateItem extends Component {
    state={
        title:"sssss",
        description:"sssss",
        image:"xxx",
        largeImage:"xxxx",
        price:20
    };
    handleChange=(e)=>{
        const {name, type, value}=e.target
        console.log({name, type, value})
        const val= type==="number"? parseFloat(value) : value
         this.setState({[name]: val})
    }
     uploadFile= async (e)=>{
        console.log('uploading....')
        const files= e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "sickfits" )
        const res = await fetch("https://api.cloudinary.com/v1_1/dmss88pfo/image/upload", {
            method: "POST",
            body: data
})
        const file= await res.json()
        console.log('file', file)
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })

    }
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, {loading, error, called, data})=>(
            <Form onSubmit={async(e)=>{
                e.preventDefault()

                const res= await createItem()
                console.log('sts', res)
                Router.push({
                    pathname: "/item",
                    query: {id:res.data.createItem.id}
                })

            }}>
                <Error error={error}/>

                <fieldset disabled={loading} aria-busy={loading}>
                < label htmlFor = "file">
                    Image
                <input
                    type = "file"
                    id = "file"
                    name = "file"
                    required
                    placeholder = "Upload an image"
                    onChange = {
                        this.uploadFile
                    }
                    required
                />
                </label>
                <label htmlFor="title">
                    Title
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        required
                    />
                </label>

                <label htmlFor = "price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        placeholder="Price"
                        value={
                            this.state.price
                        }
                        onChange={
                            this.handleChange
                        }
                        required
                    />
                </label>

                <label htmlFor = "description">
                    Description
                    <textarea
                        type = "text"
                        id = "description"
                        name = "description"
                        required
                        placeholder = "Enter a  description"
                        value = {
                            this.state.description
                        }
                        onChange = {
                            this.handleChange
                        }
                        required
                    />
                </label >
                    <button type="submit">Submit</button>
                </fieldset>
            </Form>
            )}
            </Mutation>
        )
    }
}

export {CREATE_ITEM_MUTATION}
export default CreateItem
