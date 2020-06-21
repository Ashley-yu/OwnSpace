(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-97ac05ba"],{"159b":function(t,e,a){var s=a("da84"),r=a("fdbc"),i=a("17c2"),o=a("9112");for(var c in r){var n=s[c],l=n&&n.prototype;if(l&&l.forEach!==i)try{o(l,"forEach",i)}catch(u){l.forEach=i}}},"17c2":function(t,e,a){"use strict";var s=a("b727").forEach,r=a("a640"),i=a("ae40"),o=r("forEach"),c=i("forEach");t.exports=o&&c?[].forEach:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}},"2d03":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"buyerInfo"},[a("loading",{attrs:{loader:"dots",color:"#D1ACA6",active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("HeaderPic",[a("OrderProgress",{attrs:{currentStep:t.step}})],1),a("div",{staticClass:"container"},[a("div",{staticClass:"listContent"},[a("h3",[t._v("收件資訊")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-5"},[a("ul",{staticClass:"order"},[t._l(t.cartData.carts,(function(e){return a("li",{key:e.id,staticClass:"orderList"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-2 p-0"},[a("div",{staticClass:"productImg"},[a("img",{attrs:{src:e.product.imageUrl,alt:""}})])]),a("div",{staticClass:"col-4 p-0"},[a("div",{staticClass:"productName",on:{click:function(a){return t.$router.push("/product_detail/"+e.product.id)}}},[t._v(t._s(e.product.title))])]),a("div",{staticClass:"col-2 p-0"},[a("div",{staticClass:"productQty"},[t._v("x "+t._s(e.qty))])]),a("div",{staticClass:"col-4 p-0"},[a("div",{staticClass:"productTotal"},[t._v("NT "+t._s(t._f("currency")(e.final_total/e.qty)))])])])])})),a("li",{staticClass:"orderList productSummary"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-8 col-md-7 summary"},[t._v("總計金額")]),a("div",{staticClass:"col-4 col-md-5 summary"},[t._v("NT "+t._s(t._f("currency")(t.cartData.final_total)))])])])],2)]),a("div",{staticClass:"col-md-7"},[a("form",{staticClass:"infoArea",on:{submit:function(e){return e.preventDefault(),t.createOrder(e)}}},[a("div",{staticClass:"form-row userInfo"},[a("div",{staticClass:"form-group col-sm-6"},[t._m(0),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.name,expression:"form.user.name"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("name")},attrs:{id:"userName",type:"text",name:"name",placeholder:"請輸入姓名"},domProps:{value:t.form.user.name},on:{input:function(e){e.target.composing||t.$set(t.form.user,"name",e.target.value)}}}),t.errors.has("name")?a("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("name")))]):t._e()]),a("div",{staticClass:"form-group col-sm-6"},[t._m(1),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.tel,expression:"form.user.tel"},{name:"validate",rawName:"v-validate",value:"required|cellphone",expression:"'required|cellphone'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("tel")},attrs:{id:"userTel",type:"tel",name:"tel",placeholder:"09xxxxxxxx",maxlength:"10"},domProps:{value:t.form.user.tel},on:{input:function(e){e.target.composing||t.$set(t.form.user,"tel",e.target.value)}}}),t.errors.has("tel")?a("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("tel")))]):t._e()])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-sm-6"},[t._m(2),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.email,expression:"form.user.email"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("email")},attrs:{id:"userEmail",type:"email",name:"email",placeholder:"your@email.com"},domProps:{value:t.form.user.email},on:{input:function(e){e.target.composing||t.$set(t.form.user,"email",e.target.value)}}}),t.errors.has("email")?a("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("email")))]):t._e()]),a("div",{staticClass:"form-group col-sm-6"},[a("div",{staticClass:"select-wrapper"},[t._m(3),a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.user.payment,expression:"form.user.payment"}],staticClass:"form-control",attrs:{id:"payment"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form.user,"payment",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"COD"}},[t._v("貨到付款")]),a("option",{attrs:{value:"CVS"}},[t._v("超商付款")]),a("option",{attrs:{value:"ATM"}},[t._v("ATM付款")])])])])]),a("div",{staticClass:"form-group"},[t._m(4),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.address,expression:"form.user.address"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("address")},attrs:{id:"userAddress",type:"text",name:"address",placeholder:"請輸入地址"},domProps:{value:t.form.user.address},on:{input:function(e){e.target.composing||t.$set(t.form.user,"address",e.target.value)}}}),t.errors.has("address")?a("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("address")))]):t._e()]),a("div",{staticClass:"form-group mb-5"},[a("label",{attrs:{for:"message"}},[t._v("備註")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.user.message,expression:"form.user.message"}],staticClass:"form-control",attrs:{id:"message",name:"message",cols:"10",rows:"3",placeholder:"歡迎留下想對我們說的話"},domProps:{value:t.form.user.message},on:{input:function(e){e.target.composing||t.$set(t.form.user,"message",e.target.value)}}})]),a("div",{staticClass:"btnArea d-flex justify-content-between"},[a("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.goBack(e)}}},[a("i",{staticClass:"fas fa-angle-double-left mr-1"}),t._v("上一步")]),t._m(5)])])])]),"CVS"===t.form.user.payment?a("div",{staticClass:"row"},[t._m(6)]):t._e(),"ATM"===t.form.user.payment?a("div",{staticClass:"row"},[t._m(7)]):t._e()])]),t._m(8)],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"userName"}},[t._v("收件人姓名"),a("span",{staticClass:"marker"},[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"usertel"}},[t._v("收件人手機"),a("span",{staticClass:"marker"},[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"userEmail"}},[t._v("收件人Email"),a("span",{staticClass:"marker"},[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"payment"}},[t._v("付款方式"),a("span",{staticClass:"marker"},[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"userAddress"}},[t._v("收件人地址"),a("span",{staticClass:"marker"},[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"btn",attrs:{type:"submit"}},[t._v("下一步"),a("i",{staticClass:"fas fa-angle-double-right ml-1"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-sm-12"},[a("div",{staticClass:"notice"},[a("div",{staticClass:"backText"},[t._v("PAYMENT")]),a("h5",[a("i",{staticClass:"fas fa-exclamation-circle mr-3"}),t._v("超商付款")]),a("ul",[a("li",[t._v("可至7-11，全家，萊爾富，ok便利商店進行列印單據並且繳款。")]),a("li",[t._v("在完成訂單的頁面，會顯示您此筆交易專屬的超商代碼，請記下這組代碼至鄰近的超商利用服務機器列印帳單進行繳費。")]),a("li",[t._v("繳費期限為訂單成立時間起24小時內須完成交易，若逾期超商代碼將失效，並自動取消訂單。")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-sm-12"},[a("div",{staticClass:"notice"},[a("div",{staticClass:"backText"},[t._v("PAYMENT")]),a("h5",[a("i",{staticClass:"fas fa-exclamation-circle mr-3"}),t._v("注意事項")]),a("ul",[a("li",[t._v("包含實體ATM轉帳，或是網路ATM線上轉帳。")]),a("li",[t._v("在完成訂單的頁面，會顯示您此筆交易專屬的虛擬帳號，請記下這組帳號至鄰近的ATM或網路ATM進行轉帳。")]),a("li",[t._v("繳費期限為訂單成立時間起24小時內須完成交易，若逾期虛擬帳號將失效，並自動取消訂單。")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal fade p-0",attrs:{id:"leaveBuyerModal",tabindex:"-1",role:"dialog","aria-hidden":"true","data-backdrop":"static"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[a("div",{staticClass:"modal-body"},[a("p",[t._v("尚未完成訂購流程，請確認是否離開此頁?")])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn cancel",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),a("button",{staticClass:"btn confirm",attrs:{type:"button","data-dismiss":"modal"}},[t._v("確定")])])])])])}],i=(a("99af"),a("4160"),a("159b"),a("1157")),o=a.n(i),c=a("ae61"),n=a("d10b"),l={name:"BuyerInfo",components:{HeaderPic:c["a"],OrderProgress:n["a"]},data:function(){return{form:{user:{name:"",email:"",tel:"",address:"",payment:"COD"},message:""},isLoading:!1,step:2,isNext:!1,cartData:{},isConfirm:!1}},methods:{getCartData:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("ownspace","/cart");t.$http.get(e).then((function(e){e.data.success?(t.cartData=e.data.data,t.cartData.carts.length>0?t.isConfirm=!0:t.isConfirm=!1):t.$bus.$emit("message:push",e.data.message,"danger")}))},createOrder:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("ownspace","/order"),a=t.form;t.isNext=!0,t.isLoading=!0,t.$validator.validate().then((function(s){s?t.$http.post(e,{data:a}).then((function(e){e.data.success?(localStorage.removeItem("cart"),t.$bus.$emit("cart:get"),t.$router.push("/order_info/".concat(e.data.orderId))):(t.$bus.$emit("message:push",e.data.message,"danger"),t.$router.push("/check_order"))})):t.$bus.$emit("message:push","請確認資料是否填寫完整","danger"),t.isLoading=!1}))},goBack:function(){this.isNext=!0,this.$router.go(-1)},cancelCart:function(){var t=this;t.getCartData(),t.isConfirm&&t.cartData.carts.forEach((function(e){var a="".concat("https://vue-course-api.hexschool.io","/api/").concat("ownspace","/cart/").concat(e.id);t.$http.delete(a).then((function(e){e.data.success||t.$bus.$emit("message:push",e.data.message,"danger")}))}))}},created:function(){this.getCartData()},beforeRouteLeave:function(t,e,a){var s=this;s.isNext?a():(o()("#leaveBuyerModal").modal("show"),o()(".confirm").on("click",(function(){s.cancelCart(),a()})),o()(".cancel").on("click",(function(){a(!1)})))}},u=l,d=a("2877"),m=Object(d["a"])(u,s,r,!1,null,null,null);e["default"]=m.exports},4160:function(t,e,a){"use strict";var s=a("23e7"),r=a("17c2");s({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},8418:function(t,e,a){"use strict";var s=a("c04e"),r=a("9bf2"),i=a("5c6c");t.exports=function(t,e,a){var o=s(e);o in t?r.f(t,o,i(0,a)):t[o]=a}},"99af":function(t,e,a){"use strict";var s=a("23e7"),r=a("d039"),i=a("e8b5"),o=a("861d"),c=a("7b0b"),n=a("50c4"),l=a("8418"),u=a("65f0"),d=a("1dde"),m=a("b622"),v=a("2d00"),f=m("isConcatSpreadable"),p=9007199254740991,_="Maximum allowed index exceeded",C=v>=51||!r((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),h=d("concat"),g=function(t){if(!o(t))return!1;var e=t[f];return void 0!==e?!!e:i(t)},b=!C||!h;s({target:"Array",proto:!0,forced:b},{concat:function(t){var e,a,s,r,i,o=c(this),d=u(o,0),m=0;for(e=-1,s=arguments.length;e<s;e++)if(i=-1===e?o:arguments[e],g(i)){if(r=n(i.length),m+r>p)throw TypeError(_);for(a=0;a<r;a++,m++)a in i&&l(d,m,i[a])}else{if(m>=p)throw TypeError(_);l(d,m++,i)}return d.length=m,d}})},a640:function(t,e,a){"use strict";var s=a("d039");t.exports=function(t,e){var a=[][t];return!!a&&s((function(){a.call(null,e||function(){throw 1},1)}))}},ae61:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid headerPic"},[t._t("default")],2)},r=[],i={name:"HeaderPic"},o=i,c=a("2877"),n=Object(c["a"])(o,s,r,!1,null,null,null);e["a"]=n.exports},d10b:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"orderProgress"},[a("div",{staticClass:"row m-0"},[a("div",{staticClass:"col-sm-4"},[a("div",{staticClass:"step",class:{current:1===t.currentStep}},[t._v("Step1"),a("p",[t._v("確認購買")])])]),a("div",{staticClass:"col-sm-4"},[a("div",{staticClass:"step",class:{current:2===t.currentStep}},[t._v("Step2"),a("p",[t._v("填寫資料")])])]),a("div",{staticClass:"col-sm-4"},[a("div",{staticClass:"step",class:{current:3===t.currentStep}},[t._v("Step3"),a("p",[t._v("完成訂單")])])])])])},r=[],i={name:"OrderProgress",props:["currentStep"]},o=i,c=a("2877"),n=Object(c["a"])(o,s,r,!1,null,null,null);e["a"]=n.exports},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-97ac05ba.bd93426c.js.map