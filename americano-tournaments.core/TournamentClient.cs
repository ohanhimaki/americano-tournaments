using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;

using Npgsql;



namespace americano_tournaments.core
{
    public class TournamentClient
    {
        public static string connectionString { get; set; }
        public TournamentClient(string connstring)
        {
            connectionString = connstring;
        }

        public List<string> GetTest()
        {
            string sql = $@"SELECT Value
  FROM MyTable";


            using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();

                var cmd = new NpgsqlCommand(sql, connection);
                List<string> rows = new List<string>();

                NpgsqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    rows.Add(rdr.GetString(0));
                }

                // List<string> rows = cmd.ExecuteScalar().ToString();

                return rows;
            }
        }
    }
}