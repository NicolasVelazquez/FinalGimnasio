export default class MemberUtils {

    static async populateMember(member, data) {
        member.membername = data.membername;
        member.age = data.age;
        member.email = data.email;
        member.genre = data.genre;
        member.phonenumber = data.phonenumber;
        member.birthday = data.birthday;
    }
}