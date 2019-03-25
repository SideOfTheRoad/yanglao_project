<template>
<div>
<Row>
  <Col span = 6 offset = 9>
    <i-circle :percent= this.a>
        <span class="demo-i-circle-inner" style="font-size:16px"> 医生总数： {{this.b}}</span>
    </i-circle>
    <h3>病人平均满意度 {{ this.a }}</h3>
  </Col>
</Row>
</div>
</template>
<script>
    export default {
    	data () {
    		return {
    			a: 0,
    			b: 0,
    		}
    	},
        mounted () {
        	this.$request.post('/api/doc', {
        		i :'1'
        	}).then((response) => {
        		console.log(response)
        		this.b = response.data.length
        		var all = 0
        		for(var i = 0; i < this.b; i ++ ){
        			all = all+ parseInt(response.data[i].score)
        		}
        		this.a = parseInt((all / this.b).toFixed(2))
        	})
        }
    }
</script>