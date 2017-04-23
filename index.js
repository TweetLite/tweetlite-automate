exports.use = function () {
	return function (args) {
		this.use({
			welcomeMessageCreate: {
				path: 'direct_messages/welcome_messages/new',
				method: 'post'
			},
			welcomeMessageDelete: {
				path: 'direct_messages/welcome_messages/destroy',
				method: 'delete'
			},
			welcomeMessageList: {
				path: 'direct_messages/welcome_messages/list',
				method: 'get'
			},
			welcomeMessageShow: {
				path: 'direct_messages/welcome_messages/show',
				method: 'get'
			},
			welcomeMessageRulesList :{
				path: 'direct_messages/welcome_messages/rules/list',
				method: 'get'
			},
			welcomeMessageRule :{
				path: 'direct_messages/welcome_messages/rules/new',
				method: 'post'
			}
		});


		var mesaj = null
		if (typeof args.message === 'object') {
			mesaj = args.message.join('\n').replace(/\\n/g, '\n')
		} else {
			mesaj = args.message.replace(/\\n/g, '\n')
		}
			
		this.welcomeMessageList().then( res => {
			if(res.welcome_messages){
				Promise.all(res.welcome_messages.map(message => {
					return this.welcomeMessageDelete({
							id: message.id
							});
				})).then(result => {

					console.log(result);

				}).catch(err => console.log(err));
			}

			this.welcomeMessageCreate({
			  "welcome_message" : {
			  		"message_data": {
			      		"text": mesaj
			   		}
				}
			}).then( res => {
						
				if(res.welcome_message){

					var id = res.welcome_message.id;
						this.welcomeMessageRule({
						  "welcome_message_rule": {
					      "welcome_message_id": id
					       }
						}).then( res => {
							if(res.welcome_message_rule){
								console.log('Welcome Message Activated!')
							}
						}).catch(err => console.log(err));

				} else {
					console.log('Welcome Message Not Created!')
				}
			}).catch(err => console.log(err));

		}).catch(err => console.log(err));

	}
}