// var timer = null
var ul = document.getElementsByTagName('ul')[0];
var moveWidth = ul.children[0].offsetWidth;
var num = ul.children.length - 1;
var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];
var liArr = document.getElementsByTagName('ul')[1].getElementsByTagName('li');
var key = true;
var index = 0;

leftBtn.onclick = function (){
    autoMove('left');
}
rightBtn.onclikc = function(){
    autoMove('right')
}

for(var i = 0; i < liArr.length; i ++){
    (function (j){
        liArr[j].onclick = function (){
            key = false;
            clearTimeout(timer);
            var myIndex = j;
            startMove(ul, {left: - myIndex * moveWidth}, function (){
                setTimeout(autoMove, 1000)
                key = true;
                changeIndex(myIndex);
            })
        }
    }(i))
  
}

function autoMove(dir){
    if(key){
        key = false;
        clearTimeout(timer);
        if(!dir || dir == 'right'){
            startMove(ul, {left: ul.offsetLeft - moveWidth}, function(){
                index ++;
                if(ul.offsetLeft == - num * moveWidth){
                    index = 0;
                    // console.log(11);
                    ul.style.left = 0 + 'px';
                }
                setTimeout(autoMove,1000)
                key = true;
                changeIndex(index);
            })
        }else if(dir == 'left'){
            if(ul.offsetLeft == 0){
                index = num;
                // console.log(11);
                ul.style.left = - num * moveWidth + 'px';
            }
            startMove(ul, {left : ul.offsetLeft + moveWidth}, function(){
                index --;
                setTimeout(autoMove, 1000);
                key = true;
                changeIndex(index);
            })
        }
    }  
}
var timer = setTimeout(autoMove, 1000)
function changeIndex(index){
    // console.log(index);
    for(var i = 0; i < liArr.length; i ++){
        liArr[i].className = '';
    }
    liArr[index].className = 'active';    
}