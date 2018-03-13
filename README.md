#angular编写表单验证#

## 一、整体概述 ##
表单内容如下图，包括常用的用户名、密码、确认密码、手机、邮箱等
![](https://i.imgur.com/7rX32pq.png)


1. 整体js代码很少，就一个指令用于写确认密码和密码是否相等。其他 验证都是使用angular自带的指令进行校验和显示。
2. 本demo还使用了bootstrap的栅栏功能进行布局，因为想写的是demo所以很多样式以及其他限制就不写了，我认为越是简单越好让别人改写使用

## 二、重点说明 ##
**1、表单属性：**

$dirty:已经修改过

$invalid:不合法

$valid:合法

$error:错误

$pristine:未修改过

novalidate 阻止表单默认操作

<pre>
&lt;span class="col-4" ng-show="myForm.password.$dirty && myForm.password.$invalid"&gt;
    &lt;small class="text-danger" ng-show="myForm.password.$error.required"&gt;
        密码是必填的
    &lt;/small&gt;
    &lt;small class="text-danger" ng-show="myForm.password.$error.minlength"&gt;
        长度不能小于8位
    &lt;/small&gt;
    &lt;small class="text-danger" ng-show="myForm.password.$error.maxlength"&gt;
        长度不能大于64位
    &lt;/small&gt;
&lt;/span&gt;
</pre>

**2、相关指令：**

ng-minlength:最小长度

ng-maxlength：最大长度

required：必填

ng-pattern：正则表达式验证

ng-disabled：按钮禁用

<pre>
&lt;input type="text" class="col-6" name="phone" ng-model="phone" ng-pattern="/(^0\d{2,3}\-\d{7,8}$)|(^1[3|4|5|6|7|8][0-9]{9}$)/" required/&gt;
</pre>

<pre>
&lt;button ng-disabled="myForm.$invalid" ng-click="submit()"&gt;submit&lt;/button&gt;
</pre>

**3、form表单一定要有name属性，每个input值也需要有name属性，比如已经输入过的表单表示是：myForm.name.$dirty 即 表单name.输入name.表单属性**

**4、确认密码自定义指令**

确认密码这个暂时无法通过原有的指令实现，所以使用了directive，主要是通过观察两个输入框的值，如果不相等则在确认密码栏后显示错误信息，如下
<code>
<pre>
var app = angular.module('app',[]);
app.directive('compare',function(){
    return {
        require: 'ngModel',
        link: function(scope,ele,attrs,ctrl){
            var flag = false;
            scope.$watch("password",function(scope,ele,attrs,ctrl){
                var password2 = attrs.myForm.password2.$viewValue;
                if(scope != password2) {
                    flag = true;
                }else{
                    flag = false;
                }
                attrs.myForm.password2.$invalid = flag;
            })
            scope.$watch("password2",function(scope,ele,attrs,ctrl){
                var password = attrs.myForm.password.$viewValue;
                if(scope != password) {
                    flag = true;
                }else{
                    flag = false;
                }
                attrs.myForm.password2.$invalid = flag;
            })
        }
    }
})
</pre>
</code>


	
