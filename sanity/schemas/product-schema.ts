import { title } from "process";

export default {
  // the name it  s the argument we pass for the type when making a query and the vision section or it s api Endpoints 
  name: "product",
  type: "document",
  // The title is the name appears at the studio folder
  title: "Product",
  fields: [
    {
      name: "name",
      title: "Name Of Product",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        //  we saying  here the name of the field that we want to use as a source for the slug so we can make the slug unique
        source: "name",
        // maxLength: 96,
      }
    }, {
      name: `images`,
      title: "Images",
      type: "array",
      of: [{
        type: "image",
        // options: {
        //   hotspot: true,
        // },
      }]
    }, {
      name: "category",
      title: "Category",
      type: "array",
      of: [{
        type: "string",
        // to: [{type: "category"}]
      }]
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      // So here we saying it s type of s array and it s of type string it s verty important to understrand  it this way 

      of: [
        {
          type: "string",
        }
      ]
    }
    ,
    {
      name: "description",
      title: "Description",
      type: "string",

    },
    {
      name: "sku",
      title: "Sku",
      type: "string",
    },
    {
      name: "currency",
      title: "Currency",
      type: "number",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },


  ],
};
