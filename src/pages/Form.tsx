import React, { FormEvent, Fragment, useEffect } from "react";
import { useState } from "react";
import { formInfo } from "../config/Service";
import { IForm, TentacledChild } from "../models/IForm";
import "./form.css";

export default function Form() {
  const [axiosForm, setAxiosForm] = useState<TentacledChild[]>([]);
  // const [baslik, setBaslik] = useState<any>("");
  const [htmlForm, setHtmlForm] = useState<[]>([]);

  const [userData, setUserData] = useState<{}>({});


  
  

  useEffect(() => {
    formInfo().then((res) => {
      const formData: IForm = res.data;

      const mappedFormData =
        formData.forms[0].bilgiler.formjson.children[0].children[0].children[0]
          .children;

      setAxiosForm(mappedFormData);
    });


    let arrAxios: any = [];

    axiosForm.map((item, index) => {

      // console.log('item :>> ', item); //if ile kontrol et labellar burda

      // axiosData?.children?.map((item,index) => {

      //   React.createElement(
      //     if(item.tag === 'input'), {
      //       className: String(item.class),
      //       key:index,
      //       type: item.type,
      //       value:item.name,
      //       placeholder: item.placeholder
      //     },
      //     item.html

      //   )
      //   console.log('item.html :>> ', item.html);

      // } )

      // item.children?.map((item, index) => {
      //   if (item.tag !== "label") {
      //     console.log("item :>> ", item); //
      //   }
      // });

      // console.log('itemlegendolanveolmayanlar :>> ', item);
      arrAxios.push(item);
      if (item.tag !== "legend") {
        // console.log('itemlegend :>> ', item);
        item.children?.map((item, index) => {
          arrAxios.push(item);
          if (item.tag === "div") {
            // console.log('itemdiv :>> ', item);
            item?.children?.map((item, index) => {
              arrAxios.push(item);
              // console.log('item :>> ', item);
              if (item.tag === "label" || item.tag === "select") {
                // console.log('labelveselect :>> ', item);
                item?.children?.map((item: any, index: any) => {
                  arrAxios.push(item);
                });
              }
              setHtmlForm(arrAxios);
            });
          }
        });
      }
    });
  }, [axiosForm]);

  // async function element() {
  //   // setBaslik(
  //   //   form?.forms[0].bilgiler.formjson.children[0].children[0].children[0]
  //   //     .children[0].html
  //   // );
  //   console.log('baslik :>> ', baslik);
  // }

  // let arrUser:any = []

  function userChange(e: any) {
    console.log("e.target.value :>> ", e.target.value);
    
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
      
    });
    
    
  }

  function formSubmit(e: any) {
    e.preventDefault();

    console.log("userData :>> ", userData);

  }



  return (
    <>
      <form onSubmit={(e) => formSubmit(e)}>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            {htmlForm &&
            
              htmlForm.map((item: any, index: any) => {
                
                if (item.tag === "select") {
                  
                  return (
                    <Fragment key={index}>
                      {React.createElement(
                        
                        item.tag,
                        {
                          className: item.class,
                          placeholder: item.placeholder,
                          name: item.name,
                          htmlFor: item.for,
                          value: item.value,
                          type: item.type,
                          key: index,
                          onChange: userChange,
                        },
                      
                        item.children.map((item: any, index: any) => {
                          return React.createElement(
                            item.tag,
                            {
                              className: item.class,
                              placeholder: item.placeholder,
                              name: item.name,
                              htmlFor: item.for,
                              value: item.value,
                              type: item.type,
                              key: index,
                              onChange: userChange,
                              
                            },

                            item.html
                          );
                        })
                      )}
                    </Fragment>
                  );
                } else {
                  // if (item.tag === "label") {
                  //   return React.createElement(
                  //     item.tag,
                  //     {
                  //       className: item.class,
                  //       placeholder: item.placeholder,
                  //       name: item.name,
                  //       htmlFor: item.for,
                  //       value: item.value,
                  //       type: item.type,
                  //       key: index,
                  //       onChange: userChange,
                  //     },

                  //     item.html
                  //   );
                  // }
                  // if (item.tag === "input") {
                  //   return React.createElement(
                  //     item.tag,
                  //     {
                  //       className: item.class,
                  //       placeholder: item.placeholder,
                  //       name: item.name,
                  //       htmlFor: item.for,
                  //       value: item.value,
                  //       type: item.type,
                  //       key: index,
                  //       onChange: userChange,
                  //     },

                  //     item.html
                  //   );
                  // }

                  
                  // if (item.tag === "button") {
                  //   return React.createElement(
                  //     item.tag,
                  //     {
                  //       className: item.class,
                  //       placeholder: item.placeholder,
                  //       name: item.name,
                  //       htmlFor: item.for,
                  //       value: item.value,
                  //       type: item.type,
                  //       key: index,
                  //       onChange: userChange,
                  //     },

                  //     item.html
                  //   );
                  // }
                  if (item.tag !== "select" && item.tag !== "option") {
                    return React.createElement(
                      item.tag,
                      {
                        className: item.class,
                        placeholder: item.placeholder,
                        name: item.name,
                        htmlFor: item.for,
                        value: item.value,
                        type: item.type,
                        key: index,
                        onChange: userChange,
                      },

                      item.html
                    );
                  }

                }
              })}
          </div>
          <div className="col-4"></div>
        </div>
      </form>
    </>
  );
}
