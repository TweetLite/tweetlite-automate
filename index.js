var dParser = require('duration-parser')

exports.use = function () {
	return function (args) {
		var time = dParser(args.interval) || dParser('30 minutes')
		if (time < 900000) {
			throw new Error('Time must be 15 minutes later')
		} else if (args.message) { // eslint-disable-line no-negated-condition
			var mesaj = null
			if (typeof args.message === 'object') {
				mesaj = args.message.join('\n').replace(/\\n/g, '\n')
			} else {
				mesaj = args.message.replace(/\\n/g, '\n')
			}
			automate(this, time, mesaj)
		} else {
			throw new Error('Message must be set')
		}
	}
}

function automate(context, time, msg, data) {
	context.extra.fullFollowers().then(result => {
		if (data) {
			console.log(data.length, result.length)
			var check = arrDiff(result, data)
			if (check.length <= 0) {
				setTimeout(function () {
					automate(context, time, msg, result)
				}, time)
			} else {
				context.extra.fullUserMessage(check, msg).then(() => {
					automate(context, time, msg, result)
				}).catch(() => {
					automate(context, time, msg, result)
				})
			}
		} else {
			automate(context, time, msg, result)
		}
	}).catch(err => {
		console.log(err)
		process.exit() // eslint-disable-line xo/no-process-exit
	})
}

function arrDiff(arr1, arr2) {
	return arr1.filter(x => arr2.indexOf(x) === -1)
}
