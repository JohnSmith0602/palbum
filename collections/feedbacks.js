Feedbacks = new Meteor.Collection('feedbacks');

//Feedbacks.allow({
//  // 支持客戶端（無條件）添加反饋，但不能作修改或刪除
//  insert: function(userId, doc) {
//    return true;
//  }
//});