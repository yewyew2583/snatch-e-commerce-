using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for BasicMemberInfo
/// </summary>
namespace WebFileServer.Models.Domain
{
    public class BasicMemberInfo : BO.Model.BaseModel
    {
        public long member_pk { get; set; }

        public bool IsAdmin
        {
            get
            {
                if (member_pk > 0 && Lib.String.InList(this.member_type,
                BO.Code.TypeMember.ADMIN, BO.Code.TypeMember.SUPER_ADMIN))
                {
                    return true;
                }

                return false;
            }
        }

        public bool IsMember
        {
            get
            {
                if (member_pk > 0 && Lib.String.InList(this.member_type,
                BO.Code.TypeMember.MEMBER, BO.Code.TypeMember.PARTNER,
                BO.Code.TypeMember.ADMIN, BO.Code.TypeMember.SUPER_ADMIN))
                {
                    return true;
                }

                return false;
            }
        }

        public bool IsPartner
        {
            get
            {
                if (member_pk > 0 && Lib.String.InList(this.member_type, BO.Code.TypeMember.PARTNER))
                {
                    return true;
                }

                return false;
            }
        }

        public string member_type
        {
            get { return Lib.String.NotNull(member_type_); }
            set { member_type_ = value; }
        }
        protected string member_type_;

    }
}