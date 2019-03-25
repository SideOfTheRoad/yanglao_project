<template>
<Row>
  <Col span = 10 offset = 7>
    <Upload
        multiple
        type="drag"
        action="/api/upload"
        >
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽检查照片上传</p>
        </div>
    </Upload>
  </Col>
</Row>
</template>
<script>
    export default {
        
    }
</script>