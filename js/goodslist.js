$(function(){
    var $main = $('.main')
    $.ajax({
        url : 'data/goods.json',
        type : 'get',
        dataType : 'json',
        cache : false,
        success  : function(json){
            // console.log( json );
            var domStr = ''
            $.each(json,function(index,item){
                // console.log( item );
                // <img src=${item.imgurl} alt="">
                domStr +=`
                <div class="goods">
                    <img src="${item.imgurl}" alt="">
                    <p>${item.price}</p>
                    <h3>${item.title}</h3>
                    <div data-id="${item.id}">购物车</div>
                </div>
                `
            })
            $main.append(domStr)
        }
    })
    $('.main').on('click','.goods div',function(){
        // 存储商品id 和数量
        var id = $(this).attr('data-id')
        var goodsArr = []

        if(localStorage.getItem('goods')){
            goodsArr = JSON.parse( localStorage.getItem('goods') )
        }

        var flag = false
        
        $.each(goodsArr,function(index,item){
            if(item.id === id){
                item.num++
                flag = true
            }
        })
        if(!flag){
            goodsArr.push({"id":id,'num':1})
        }
        localStorage.setItem('goods',JSON.stringify(goodsArr))
        alert('加入购物车成功！')
    })
})