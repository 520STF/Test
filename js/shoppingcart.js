$(function(){
    console.log( '123' );
    if(localStorage.getItem('goods')){
        var goodsArr = JSON.parse( localStorage.getItem('goods') )

        $.ajax({
            url : './data/goods.json',
            type : 'get',
            dataType : 'json',
            success : function(json){
                var domStr = ''
                console.log( json );
                $.each(json,function(index,item){
                    $.each(goodsArr,function(ind,ite){
                        if(item.id == ite.id){
                            domStr += `
                            <li>
                                <input type="checkbox" data-check = ${item.id}>
                                <img src="${item.imgurl}" alt="">
                                <h3>${item.title}</h3>
                                <p>${item.price}</p>
                                <button data-add="${item.id}" class="add">+</button>
                                
                                <span>${ite.num}</span>
                                
                                <button data-less="${item.id}" class="less">-</button>
                                <em data-id="${item.id}">删除</em>
                            </li>`
                        }
                    })
                })
                $('.list').html(domStr)
            }
        })

        $('.list').on('click','li em',function(){
            var id = $(this).attr('data-id')
            $.each(goodsArr,function(index,item){
                if(item.id = id){
                    goodsArr.splice(index,1)
                    return false;
                }
            })
            // 删除dom结构
            $(this).parent().remove()
            localStorage.setItem('goods',JSON.stringify(goodsArr))
            if(goodsArr.length <= 0){
                localStorage.removeItem('goods')
                var newLi = '<li>购物车暂无数据</li>'
                $('.list').html(newLi)
            }
        })

        $('.head input').click(function(){
            if($(this).prop('checked')){
                $('.list input').prop('checked',true)
            }else{
                $('.list input').prop('checked',false)
            }
        })

        $('.list').on('click','li .add',function(){
            var id = $(this).attr('data-add')
            console.log( id );
            var _this = this
            $.each(goodsArr,function(index,item){
                // console.log( index,item );
                if(item.id == id){
                    
                    item.num++;
                    console.log( item );
                    // console.log( $(this).next() );
                    $(_this).siblings('span').text(item.num)
                    console.log( $(this).siblings('span') );
                    // $('.list span').eq(index).html(item.num)
                }
                
                // localStorage.setItem('goods',JSON.stringify(goodsArr))
            })
            localStorage.setItem('goods',JSON.stringify(goodsArr))
        })
        $('.list').on('click','li .less',function(){
            var id = $(this).attr('data-less')
            console.log( id );
            var _this = this
            $.each(goodsArr,function(index,item){
                // console.log( index,item );
                if(item.id == id){
                    
                    item.num--;
                    if(item.num <=0){
                        goodsArr.splice(index,1)
                        // $('').eq(index).parent().remove()
                        $(_this).parent().remove()
                        console.log( $(this) );
                        return false
                    }
                    
                    // console.log( item );
                    $(_this).siblings('span').html(item.num)
                }
            })
            if(localStorage.length<=0){
                localStorage.removeItem('goods')
                var newLi = '<li>购物车暂无数据</li>'
                $('.list').html(newLi)
            }
            localStorage.setItem('goods',JSON.stringify(goodsArr))
        })

        // 结账
        $('.res').on('click','.btn',function(){
            var sum = 0;
            var flag = false;
            $('.list input').each(function(index,item){
                if(!item.checked && flag==true){
                    // alert("未选择商品")
                    return false;
                }
                if(item.checked){
                    
                    var splice = parseFloat($(item).siblings('p').text())
                    var num = parseFloat($(item).siblings('span').text())
                    console.log( splice,num );
                    sum += splice*num
                }else{
                    flag = true
                }
            
            })
            if(sum == 0){
                return ;
            }
            alert(sum)
            // return false;
        })

    }else{
        var newLi = '<li>购物车暂无数据</li>'
        $('.list').html(newLi)
    }

})