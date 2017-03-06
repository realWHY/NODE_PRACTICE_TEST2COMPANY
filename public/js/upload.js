$(document).ready(function(){
    $('.upload-btn').on('click',function(){
        console.log('click choose file');
        $('#upload-input').click();
        $('.progress-bar').text('0%');
        $('.progress-bar').width('0%');
    });
    
    $('#upload-input').on('change',function(){
        
        var uploadInput = $('#upload-input');
        console.log($('#upload-input'));
        console.log(uploadInput);
        console.log('uploadInput.val()  '+ uploadInput.val());
        if(uploadInput.val() !=''){
            var formData = new FormData();
            console.log('uploadInput[0] '+uploadInput[0]);
            //console.log('uploadInput[0].files[0] '+uploadInput[0].files[0]);
            formData.append('upload', uploadInput[0].files[0]);  
            console.log('uploadInput[0] files[0]'+uploadInput[0].files[0]);
            console.log(formData);
            $.ajax({
                url:'/upload',
                type:'POST',
                data:formData,
                processData:false,
                contentType:false,
                success:function(data){
                    $('#upload-input').val('');
                }, 
                xhr: function(){
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function(e){
                        if(e.lengthComputable){
                            var uploadPercent=e.loaded/e.total;
                            uploadPercent = (uploadPercent*100);
                            $('.progress-bar').text(uploadPercent+'%');
                            $('.progress-bar').width(uploadPercent+'%');
                            
                            if(uploadPercent === 100){
                                $('.progress-bar').text('Done');
                                $('#completed').text('Completed');
                            }
                        }
                    }, false);
                    return xhr;
                }
            })
        }
    });
})

//$(document).ready(function(){
//    
//    $('.upload-btn').on('click', function(){
//        $('#upload-input').click();
//        
//        $('.progress-bar').text('0%');
//        $('.progress-bar').width('0%');
//    });
//})