module.exports.config = {
	name: "rules",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "JRT",
	description: "rules Menu",
	commandCategory: "Công cụ",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 1000
	}
};

module.exports.languages = {
	"en": {
		"moduleInfo": " ",
		"helpList": '⚠️rules of this group⚠️\n\n🌀🔸 Category: ⚠️rules⚠️\n\n1. সবাইকে সম্মান দিয়ে কথা বলতে হবে৷\n2. কোন গালি দেওয়া যাবে না, অতীব জরুরি হলে ** চিহ্ন ব্যবহার করতে হবে, যাতে গালি বুঝা না যায়।\n3. ধর্মীয় অনুভূতিতে আঘাত হানে এমন কথা বলা যাবে না।\n4. রাজনৈতিক আলাপ নিষিদ্ধ। only BAL is real\n5. কাউকে ইনবক্সে ডাকা যাবে না (মেয়েদের)\n6. গ্রুপে কোন লিংক দেওয়া যাবে না, দিলে ওয়ার্নিং। আর কোন মেসেঞ্জার গ্রুপের লিংক দিলে কিক, ২য় বার ব্যান।\n7. 18+ video দেওয়া যাবে না।\n8. গ্রুপের নাম কোনভাবেই এডমিন ব্যাতিত অন্য কেউ চেঞ্জ করতে পারবে না।\n9. অশ্লীলতা বোঝায় এমন কোন শব্দের যেকোনো ভাষায় শর্ট ফর্ম ও ব্যাবহার করা যাবে না\
n\n🌀🔸Category Repot Admin🔹\n\n✅ For More Contact With Bot Developer :        🔸\n\n',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
}

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("rules") != 0) return;
	const splitBody = body.slice(body.indexOf("rules")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const command = commands.values();
		var group = [], msg = "";
		for (const commandConfig of command) {
			if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
			else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
		}
		
		return api.sendMessage(msg + getText("helpList", commands.size, prefix), threadID, async (error, info) =>{
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		});

	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
    }